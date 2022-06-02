// je crée une classe afin d'avoir un modèle que je vais alimenter (instancier)
// avec les paramètres nécessaires à ma bibliothèque.
class Livre {
    // pour que chaque livre ait un titre, auteur, etc, on crée un constructor
    constructor(titre, auteur, description, nombreDePages, nombreDePagesLues) {
        this.titre = titre;
        this.auteur = auteur;
        this.description = description;
        this.nombreDePages = nombreDePages;
        this.nombreDePagesLues = nombreDePagesLues;
    }
    // ma fonction me retourne le résultat de la fonction dejaLucondition()
    get dejaLu() {
        return this.dejaLuCondition();
    }
    // je crée une fonction qui me permet de déterminer si le livre est lu ou non
    dejaLuCondition() {
        // si le nombre de pages est strictement égal à aux pages lues
        if (this.nombreDePages === this.nombreDePagesLues) {
            // alors on retourne true
            return true;
        } else {
            // sinon false
            return false;
        }
    }
}

// j'instancie ma classe Livre avec mes ouvrages préférés
let livre1 = new Livre("La bête humaine", "Émile Zola", "C'est l'histoire d'un mec dans un train", 400, 400);
let livre2 = new Livre("Dialogue de bêtes", "Colette", "C'est l'histoire d'un chien qui parle avec un chat", 200, 190);
let livre3 = new Livre("Le mariage de Figaro", "Beaumarchais", "C'est l'histoire d'un mec qui va se marier", 300, 60);
let livre4 = new Livre("La peau de chagrin", "Balzac", "C'est l'histoire d'un mec qui passe 30 pages dans une boutique", 400, 0);
let livre5 = new Livre("Bel Ami", "Maupassant", "C'est l'histoire d'un mec qui monte à Paris pour (dé)trousser de la bourgeoise", 380, 380);
let livre6 = new Livre("Boris Vian", "L'herbe rouge", "C'est l'histoire d'un mec qui n'a pas fait que la regarder, son herbe", 275, 180);

// puis je place tous mes livres dans un tableau
const livres = [livre1, livre2, livre3, livre4, livre5, livre6];

/* je calcule le nombre total de pages dans ma bibliothèque
 j'initialise une variable en utilisant la méthode reduce()
 La méthode reduce() applique une fonction qui est un « accumulateur » 

Une fonction de rappel (aussi appelée callback en anglais) est une fonction passée 
dans une autre fonction en tant qu'argument, qui est ensuite invoquée 
à l'intérieur de la fonction externe pour accomplir une sorte de routine ou d'action.

*/
let totalPagesBibliotheque = livres.reduce(
    // ce callback est la fonction à exécuter sur chaque valeur de la liste
    // sauf si aucune valeur initiale à été déclarée
    function (
        // l'accumulateur, c'est la valeur accumulée au fur et à mesure des appels
        accumulateur,
        // la valeur courante est la valeur de l'élément en train d'être manipulé
        valeurCourante
        ){
    // on retourne la somme de tous ces callback en ciblant bien la propriété nombreDePages
    return accumulateur + valeurCourante.nombreDePages;
},
// on initialise à 0 afin de pouvoir démarrer
0);


// on recherche l'id total-pages pour lui passer la variable totalPagesBibliothèque
document.getElementById("total-pages").innerHTML = totalPagesBibliotheque;

// on recommence pour le total de pages lues
let totalPagesBibliothequeLues = livres.reduce(function (accumulateur, valeurCourante){
    return accumulateur + valeurCourante.nombreDePagesLues;
},0);
// on passe le résultat dans l'id
document.getElementById("total-pages-lues").innerHTML = totalPagesBibliothequeLues;

// j'écris une fonction pour calculer la moyenne
function calculPourcentageLecture(totalPagesBibliothequeLues, totalPagesBibliotheque ) {
    return( (totalPagesBibliothequeLues/totalPagesBibliotheque )*100)
    // j'arrondis à 2 chiffres après la virgule.
    .toFixed(2); 
}

document.getElementById("pourcentage-lecture").innerHTML = calculPourcentageLecture(totalPagesBibliothequeLues, totalPagesBibliotheque);


// j'initialise une variable vide qui va servir de conteneur à mon template
let htmlElements = "";

// Je crée une boucle qui va récupérer toutes mes instances et affichera autant de blocs
// qu'il y a eu d'instance.
for (let livre of livres) {
    // j'écris une fonction qui va me permettre de calculer le % restant de lecture
    function calculPourcentageLectureRestante() {
        // je renvoie 100 - %age total
        return (100-((livre.nombreDePagesLues/livre.nombreDePages)*100)).toFixed(0) + "% restants";
    }
      // si le livre a été lu en entier
    if (livre.dejaLu === true) {
        // j'indique que c'est le cas grâce à font awesome.
        estDejaLu = "<i class='fas fa-check vert'></i>";
        // s'il est déjà lu, alors je ne renvoie rien
        calculPourcentageLectureRestanteAffichage = "";
        // je précise qu'il n'y a plus de pages à lire
        pagesRestantes = "<span class='text-success'>Pas de page restante !</span>";
    } else {
        // sinon je renvoie une icône stop
        estDejaLu = "<i class='far fa-times-circle rouge'></i>";
        // et je calcule 
        pagesRestantes = livre.nombreDePages - livre.nombreDePagesLues;
        // j'appelle ma fonction afin d'afficher le % restant
        calculPourcentageLectureRestanteAffichage = calculPourcentageLectureRestante();
    }
    
    // mon template HTML : on utilise `` (alt gr + 7) pour encapsuler notre code et `+maVariable+`pour injecter nos variables
    htmlElements += `
        <div class="col-md-6">
            <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative bgBlanc">
                <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-primary">`+ livre.auteur + `</strong>
                    <h3 class="mb-0 gras">`+ livre.titre + `</h3>
                    <p class="card-text mb-4 description"><em>`+ livre.description + `</em></p>
                    <p>Nombre de pages : <span class="resultats">`+ livre.nombreDePages + ` </span><br>
                       Nombre de pages lues : <span class="resultats"> `+ livre.nombreDePagesLues + ` </span></p>
                    <p>Nombre de pages restantes : <span class="text-warning gras">`+ pagesRestantes + `</span> </p>                    
                </div>
                <div class="validationLecture"> ` + estDejaLu + `                    
                <p class="pourcentage text-secondary">`+ calculPourcentageLectureRestanteAffichage +`</p>   
                </div>
            </div>
        </div>
    `
}
// dans mon document, je recherche le bloc avec l'ID mesLivres
let mesLivres = document.getElementById("mesLivres");
// puis, j'injecte le contenu de htmlElements dans mon DOM
mesLivres.innerHTML = htmlElements;


