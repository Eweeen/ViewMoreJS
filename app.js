class Load {
    constructor({ container, itemPreview, itemToLoad }){
        this.container = container
        this.itemPreview = itemPreview
        this.itemToLoad = itemToLoad
    }

    currentLoad = 0;

    init(){
        let loadFirstItems = this.itemPreview;

        // Si le nombre d'item dans le container est superieur au nombre d'item à afficher au départ on créer le bouton "voir plus"
        if (this.itemPreview < this.container.children.length){
            let button = document.createElement('div');
            button.classList.add('load_more');
            button.innerText = "Voir plus";
            this.container.appendChild(button);
            
            button.addEventListener('click', () => {
                // Si on a affiché tout les item on utilise la fonction charger moins
                if (this.container.children.length - 1 <= this.itemPreview + this.itemToLoad * this.currentLoad){
                    this.loadLess();
                } 
                // Sinon charger plus
                else this.loadMore();
            });
        }
        else loadFirstItems = this.container.children.length;
        
        // On affiche le nombre d'item a charger au départ
        for (let i = 0; i < loadFirstItems; i++){
            if (this.container.children[i].classList.contains('item')) this.container.children[i].classList.add('active');
        }
    }

    loadMore(){
        this.currentLoad++;
        let loadCalc = this.itemToLoad;

        // Calcul si les prochains item sont inférieur à itemToLoad
        if (this.itemPreview + (this.currentLoad * this.itemToLoad) > this.container.children.length - 1){
            loadCalc = this.itemToLoad - ((this.itemPreview + (this.currentLoad * this.itemToLoad)) - (this.container.children.length - 1));
        }
        
        // Boucle pour afficher les item
        for (let i = 0; i < loadCalc; i++){
            if (this.currentLoad === 1){
                if (this.container.children[(this.itemPreview * this.currentLoad) + i].classList.contains('item') && !this.container.children[(this.itemPreview * this.currentLoad) + i].classList.contains('active')){   
                    this.container.children[(this.itemPreview * this.currentLoad) + i].classList.add('active');
                }
            } else {
                if (this.container.children[(this.itemPreview + this.itemToLoad * (this.currentLoad - 1)) + i].classList.contains('item') && !this.container.children[(this.itemPreview + this.itemToLoad * (this.currentLoad - 1)) + i].classList.contains('active')){   
                    this.container.children[(this.itemPreview + this.itemToLoad * (this.currentLoad - 1)) + i].classList.add('active');
                }
            }
        }
        
        // Si on a affiché tout les item alors on change le texte
        if (this.container.children.length - 1 <= this.itemPreview + this.itemToLoad * this.currentLoad) document.querySelector('.load_more').innerText = "Voir moins";
    }

    loadLess(){
        for (let i = 0; i < this.container.children.length; i++){
            if (i < this.itemPreview) this.container.children[i].classList.add('active');
            else this.container.children[i].classList.remove('active');
        }

        this.currentLoad = 0;
        document.querySelector('.load_more').innerText = "Voir plus";
    }
}