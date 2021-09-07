(function(){
  const pesquisarPerfil = document.getElementById('pesquisarPerfil')
  const search = document.getElementById('search')
  const url = "https://api.github.com/users"
  // const client_id= coloque seu client id
  // const client_secret= coloque sua client secret
  const erro = document.querySelector('.erroSearch')
  const imgMsgInicial = document.querySelector('.containerZero')
  const containerInfos = document.querySelector('.containerInfos')

  async function getUser(user) {
    const profileResponse = await fetch(`${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`)

    const profile = await profileResponse.json();

    return profile
  }

  function verifica(valor){
    if(valor == null || valor == undefined || valor == '' || valor == false) {
      return `Não localizado`
    } else {
      return valor
    }
  }
  function verifica2(valor){
    if(valor == null || valor == undefined || valor == '' || valor == false) {
      return `0`
    } else {
      return valor
    }
  }
  function showProfile(user) {
     containerInfos.innerHTML = `
    <div class="imgPerfil">
      <img loading="lazy" src="${user.avatar_url}" alt="Foto de perfil github">
    </div>
    <div class="containerTextsInfos">
      <div class="namesProfile">
        <div class="nameUser">
          <h1>${verifica(user.name)}</h1>
          <a href="${user.html_url}" target="_blank" class="linkPerfil">@${user.login}</a>
        </div>
        <span>Membro desde ${user.created_at.slice(0,10)}</span>
      </div>
      <div class="bioUser">
        <span>${verifica(user.bio)}</span>
      </div>
      <div class="boxFollows">
        <div class="infosFollows">
          <span>Repos</span>
          <span>${verifica2(user.public_repos)}</span>
        </div>
        <div class="infosFollows">
          <span>Seguidores</span>
          <span>${verifica2(user.followers)}</span>
        </div>
        <div class="infosFollows">
          <span>Seguindo</span>
          <span>${verifica2(user.following)}</span>
        </div>
      </div>
      <div class="boxNetworking">
        <div class="sociaisBox">
          <div class="iconTextSociais">
            <i class="ri-map-pin-2-fill"></i>
            <span>${verifica(user.location)}</span>
          </div>
          <div class="iconTextSociais">
            <i class="ri-links-line"></i>
            <a href="${user.blog}" target="_blank">${verifica(user.blog)}</a>
          </div>
        </div>
        <div class="sociaisBox">
          <div class="iconTextSociais">
            <i class="ri-twitter-fill"></i>
            <a href="${user.twitter_username}" target="_blank">${verifica(user.twitter_username)}</a>
          </div>
          <div class="iconTextSociais">
            <i class="ri-building-fill"></i>
            <span>${verifica(user.company)}</span>
          </div>
        </div>
      </div>
    </div>
    `
  }

  search.addEventListener('click', () => {
    let consulta = pesquisarPerfil.value
    
    if(consulta.length <= 0) {
      document.getElementById('pesquisarPerfil').focus()
      erro.classList.remove('ocult');
      setTimeout(function(){erro.classList.add('ocult');}, 5000);
    }
    
    if(consulta.length > 0) {
      getUser(consulta).then(res => showProfile(res));
      document.getElementById('pesquisarPerfil').value = ''
      erro.classList.add('ocult');
      imgMsgInicial.classList.add('ocult');
      return 
    }
  })

  pesquisarPerfil.addEventListener('keypress', (e) => {
    let tecla = e
    let consulta = pesquisarPerfil.value
    if(consulta.length <= 0 && tecla.key === 'Enter') {
      document.getElementById('pesquisarPerfil').focus()
      erro.classList.remove('ocult');
      setTimeout(function(){erro.classList.add('ocult');}, 5000);
    }

    if(consulta.length > 0 && tecla.key === 'Enter') {
      getUser(consulta).then(res => showProfile(res));
      document.getElementById('pesquisarPerfil').value = ''
      erro.classList.add('ocult');
      imgMsgInicial.classList.add('ocult');
      return 
    }
  })

})();
