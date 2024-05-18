document.addEventListener('DOMContentLoaded', function() {
  // Fonction pour charger le fichier de langue correspondant
  function chargerLangue(langue) {
    // Charger le fichier JSON de langue correspondant
    fetch(`lang-${langue}.json`)
      .then(response => response.json())
      .then(data => {
        // Remplacer chaque élément de la page avec sa traduction correspondante
        Object.keys(data).forEach(key => {
          const element = document.querySelector(`[data-i18n="${key}"]`);
          if (element) {
            element.textContent = data[key];
          }
        });
      })
      .catch(error => console.error('Erreur de chargement du fichier de langue :', error));
  }

  // Écouteurs d'événements pour le clic sur les boutons de changement de langue
  document.getElementById('btn-lang-fr').addEventListener('click', function() {
    chargerLangue('fr');
  });

  document.getElementById('btn-lang-en').addEventListener('click', function() {
    chargerLangue('en');
  });

  document.getElementById('btn-lang-ja').addEventListener('click', function() {
    chargerLangue('ja');
  });
});

// Fonction pour lire le contenu du fichier JSON
function lireFichierJSON(url) {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType("application/json");
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
              resolve(xhr.responseText);
          } else if (xhr.readyState === 4 && xhr.status !== 200) {
              reject("Erreur de chargement du fichier : " + xhr.statusText);
          }
      };
      xhr.send(null);
  });
}

// Appel de la fonction pour lire le fichier JSON
lireFichierJSON('lang-en.json')
  .then(data => {
      // Affichage du contenu dans la balise <pre>
      document.getElementById('json-content').textContent = data;
      // Si tu veux manipuler les données directement, tu peux les parser en JSON
      const jsonParsed = JSON.parse(data);
      console.log(jsonParsed); // Affiche les données dans la console
  })
  .catch(error => {
      // En cas d'erreur
      console.error(error);
  });

