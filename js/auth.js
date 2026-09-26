const AuthModule = (function() {
  let currentUser = null;
  let csrfToken = '';

  function init() {
    bindProfileMenu();
    return restoreSession();
  }

  async function restoreSession() {
    try {
      setCurrentUser(await CropGuardianAPI.getCurrentUser());
    } catch (error) {
      setCurrentUser(null);
    }
    return currentUser;
  }

  function setCurrentUser(user) {
    currentUser = user || null;
    csrfToken = currentUser?.csrfToken || '';
    StorageModule.setUserScope(currentUser?.id ?? null);
    if (currentUser?.preferredLanguage) {
      StorageModule.saveLanguage(currentUser.preferredLanguage);
      I18nModule.restoreLanguage(currentUser.preferredLanguage);
    }
    renderProfileMenu();
  }

  function bindProfileMenu() {
    const wrapper = document.getElementById('authProfileMenu');
    const trigger = document.getElementById('profileMenuButton');
    const menu = document.getElementById('profileDropdownMenu');
    const logoutButton = document.getElementById('logoutButton');
    if (trigger && menu) {
      trigger.addEventListener('click', () => {
        menu.hidden = !menu.hidden;
        trigger.setAttribute('aria-expanded', String(!menu.hidden));
      });
      document.addEventListener('click', (event) => {
        if (wrapper && !wrapper.contains(event.target)) {
          menu.hidden = true;
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          menu.hidden = true;
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    }
    logoutButton?.addEventListener('click', logout);
  }

  function renderProfileMenu() {
    const signIn = document.getElementById('authSignInLink');
    const wrapper = document.getElementById('authProfileMenu');
    const name = document.getElementById('profileUserName');
    const nameCopy = document.getElementById('profileUserNameCopy');
    const email = document.getElementById('profileUserEmail');
    if (signIn) signIn.hidden = Boolean(currentUser);
    if (wrapper) wrapper.hidden = !currentUser;
    if (name) name.textContent = currentUser?.name || '';
    if (nameCopy) nameCopy.textContent = currentUser?.name || '';
    if (email) email.textContent = currentUser?.email || '';
  }

  async function loadUserData() {
    if (!currentUser) return;
    const [analysisResult, historyResult] = await Promise.allSettled([
      CropGuardianAPI.getAnalyses(),
      CropGuardianAPI.getChatHistory()
    ]);
    if (analysisResult.status === 'fulfilled') {
      StorageModule.replaceScans(analysisResult.value);
    }
    if (historyResult.status === 'fulfilled') {
      AssistantModule.loadHistory(historyResult.value);
    }
  }

  async function savePreferredLanguage(language) {
    if (!currentUser || !['en', 'te', 'hi'].includes(language)) return;
    try {
      const updatedUser = await CropGuardianAPI.updateUserProfile({ preferredLanguage: language });
      setCurrentUser(updatedUser);
    } catch (error) {
      console.warn('Unable to sync the preferred language.', error);
    }
  }

  async function saveChatTurn(question, response) {
    if (!currentUser) return true;
    try {
      await CropGuardianAPI.saveChatTurn({ question, response });
      return true;
    } catch (error) {
      return false;
    }
  }

  async function clearChatHistory() {
    if (!currentUser) return true;
    try {
      await CropGuardianAPI.clearChatHistory();
      return true;
    } catch (error) {
      return false;
    }
  }

  async function saveAnalysis(snapshot) {
    if (!currentUser) return true;
    try {
      const saved = await CropGuardianAPI.saveAnalysis(snapshot);
      const remaining = StorageModule.getScans().filter(scan => String(scan.id) !== String(snapshot.id));
      StorageModule.replaceScans([saved, ...remaining]);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function deleteAnalysis(id) {
    if (!currentUser) return true;
    try {
      await CropGuardianAPI.deleteAnalysis(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function logout() {
    try {
      await CropGuardianAPI.logout();
    } catch (error) {
      console.warn('The session could not be closed on the server.', error);
    } finally {
      setCurrentUser(null);
      window.location.assign('index.html');
    }
  }

  function showFormStatus(form, message) {
    const status = form.querySelector('[role="status"]');
    I18nModule.setText(status, message);
  }

  function bindAuthForms() {
    I18nModule.init();
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginForm?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const submitButton = form.querySelector('button[type="submit"]');
      const values = new FormData(form);
      if (submitButton) submitButton.disabled = true;
      showFormStatus(form, 'Signing in...');
      try {
        setCurrentUser(await CropGuardianAPI.login({
          email: values.get('email'),
          password: values.get('password'),
          rememberMe: values.get('rememberMe') === 'on'
        }));
        window.location.assign('index.html');
      } catch (error) {
        showFormStatus(form, error.message || 'Unable to sign in. Please try again.');
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });

    signupForm?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const submitButton = form.querySelector('button[type="submit"]');
      const values = new FormData(form);
      if (values.get('password') !== values.get('passwordConfirm')) {
        showFormStatus(form, 'Passwords do not match.');
        return;
      }
      if (submitButton) submitButton.disabled = true;
      showFormStatus(form, 'Creating your account...');
      try {
        setCurrentUser(await CropGuardianAPI.signup({
          name: values.get('name'),
          email: values.get('email'),
          password: values.get('password')
        }));
        window.location.assign('index.html');
      } catch (error) {
        showFormStatus(form, error.message || 'Unable to create your account. Please try again.');
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAuthForms, { once: true });
  } else {
    bindAuthForms();
  }

  return {
    init, loadUserData, getUser: () => currentUser,
    getCsrfToken: () => csrfToken,
    isAuthenticated: () => Boolean(currentUser),
    savePreferredLanguage, saveChatTurn, clearChatHistory,
    saveAnalysis, deleteAnalysis
  };
})();