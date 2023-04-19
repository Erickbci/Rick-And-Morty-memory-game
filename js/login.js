function onChangeEmail() {
  toggleButtonsDisable();
  toggleEmailErrors();
}

function onChangePassword() {
  toggleButtonsDisable();
  togglePasswordError();
}

function login(){
  showLoading();
  firebase.auth().signInWithEmailAndPassword(
    form.email().value, form.password().value
  ).then(response => {
    hideLoading();
    window.location.href = 'pages/game/game.html'
  }).catch(error => {
    hideLoading();
    alert(getErrorMessages(error))
  })
}

function getErrorMessages(error){
  if(error.code == 'auth/user-not-found'){
    return "Usuário nao encontrado";
  }
  if (error.code == 'auth/wrong-password'){
    return "Senha inválida"
  }
  return error.message;
}

function register(){
  window.location.href = 'pages/register/register.html' 
}

function recoverPassword() {
  showLoading();
  firebase.auth().sendPasswordResetEmail(
    form.email().value
    ).then(() => {
      hideLoading();
      alert('Email enviado com sucesso')
    }).catch(error => {
      hideLoading();
      alert(getErrorMessages(error));
    })
}

function isEmailValid() {
  const email = form.email().value
  if (!email) {
    return false;
  }
  return validateEmail(email)
}

function toggleEmailErrors() {
  const email = form.email().value
  form.emailRequiredError().style.display = email ? 'none' : 'block';
  form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
}

function togglePasswordError() {
  const password = form.password().value;
  form.passwordRequiredError().style.display = password ? 'none' : 'block';
}

function toggleButtonsDisable() {
  const emailValid = isEmailValid();
  form.recoverPassword().disabled = !emailValid;

  const passwordValid = isPasswordValid();
  form.loginButton().disabled = !emailValid || !passwordValid;
}

function isPasswordValid() {
  const password = form.password().value
  if (!password) {
    return false;
  }
  return true;
}

function seePassword() {
  if (form.password().type === 'password') {
    form.password().type = 'text';
    form.seePasswordImage().setAttribute('src', './images/olho.svg');   
    return;
  } else {
    form.password().type = 'password';
    form.seePasswordImage().setAttribute('src', './images/olho-fechado.svg');
  } 

}


const form = {
  email: () => document.getElementById('email'),
  emailInvalidError: () => document.getElementById('email-invalid-error'),
  emailRequiredError: () => document.getElementById('email-required-error'),
  loginButton: () => document.getElementById('login-button'),
  password: () => document.getElementById('password'),
  passwordRequiredError: () => document.getElementById('password-required-error'),
  recoverPassword: () => document.getElementById('recover-password-button'),
  seePasswordImage: () => document.getElementById('see-password-img')
}