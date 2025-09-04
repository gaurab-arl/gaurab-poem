class PoemPagination {
    constructor(poems, itemsPerPage = 25) {
        this.poems = poems;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.filteredPoems = [...poems];
        this.currentFilter = 'all';
        this.searchTerm = '';
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.render();
    }
    
    bindEvents() {
        // Category filter
        const categorySelect = document.getElementById('poem-category');
        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.filterPoems();
                this.currentPage = 1;
                this.render();
            });
        }
        
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase().trim();
                this.filterPoems();
                this.currentPage = 1;
                this.render();
            });
        }
    }
    
    filterPoems() {
        this.filteredPoems = this.poems.filter(poem => {
            const matchesCategory = this.currentFilter === 'all' || poem.category === this.currentFilter;
            const matchesSearch = this.searchTerm === '' || 
                poem.title.toLowerCase().includes(this.searchTerm) ||
                poem.description.toLowerCase().includes(this.searchTerm);
            
            return matchesCategory && matchesSearch;
        });
    }
    
    getTotalPages() {
        return Math.ceil(this.filteredPoems.length / this.itemsPerPage);
    }
    
    getCurrentPagePoems() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredPoems.slice(startIndex, endIndex);
    }
    
    goToPage(page) {
        const totalPages = this.getTotalPages();
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.render();
            this.scrollToTop();
        }
    }
    
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    render() {
        this.renderPoems();
        this.renderPagination();
        this.renderStats();
    }
    
    renderPoems() {
        const container = document.querySelector('.poems-grid');
        if (!container) return;
        
        const currentPoems = this.getCurrentPagePoems();
        
        if (currentPoems.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">📚</div>
                    <h3>No poems found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = currentPoems.map(poem => `
            <a href="${poem.url}" class="poem-card" data-category="${poem.category}" aria-label="Read ${poem.title}">
                <span class="poem-category">${poem.category}</span>
                 ${poem.subcategory ? `<span class="poem-subcategory">${poem.subcategory}</span>` : ''}
                <img src="images/unified-header.jpeg" alt="${poem.title}" loading="lazy">
                <div class="poem-card-content">
                    <h2 class="poem-title">${poem.title}</h2>
                    <p class="poem-description">${poem.description}</p>
                </div>
            </a>
        `).join('');
        
        // Add staggered animation
        const cards = container.querySelectorAll('.poem-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    renderPagination() {
        const container = document.querySelector('.pagination-container');
        if (!container) return;
        
        const totalPages = this.getTotalPages();
        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }
        
        let paginationHTML = '<div class="pagination">';
        
        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `
                <button class="pagination-btn pagination-prev" onclick="poemPagination.goToPage(${this.currentPage - 1})">
                    <span>←</span> Previous
                </button>
            `;
        }
        
        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);
        
        if (startPage > 1) {
            paginationHTML += `<button class="pagination-btn" onclick="poemPagination.goToPage(1)">1</button>`;
            if (startPage > 2) {
                paginationHTML += '<span class="pagination-ellipsis">...</span>';
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const isActive = i === this.currentPage ? 'active' : '';
            paginationHTML += `
                <button class="pagination-btn ${isActive}" onclick="poemPagination.goToPage(${i})">${i}</button>
            `;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += '<span class="pagination-ellipsis">...</span>';
            }
            paginationHTML += `<button class="pagination-btn" onclick="poemPagination.goToPage(${totalPages})">${totalPages}</button>`;
        }
        
        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `
                <button class="pagination-btn pagination-next" onclick="poemPagination.goToPage(${this.currentPage + 1})">
                    Next <span>→</span>
                </button>
            `;
        }
        
        paginationHTML += '</div>';
        container.innerHTML = paginationHTML;
    }
    
    renderStats() {
        const statsContainer = document.querySelector('.pagination-stats');
        if (!statsContainer) return;
        
        const totalPoems = this.filteredPoems.length;
        const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endIndex = Math.min(this.currentPage * this.itemsPerPage, totalPoems);
        
        if (totalPoems === 0) {
            statsContainer.innerHTML = '';
            return;
        }
        
        statsContainer.innerHTML = `
            <div class="stats-info">
                Showing ${startIndex}-${endIndex} of ${totalPoems} poems
            </div>
        `;
    }
}

// Poems data
const poemsData = [
    {
        title: Farak Ta Cha,
        url: "/poems/farakta.html",
        category: "introspection",
        subcategory: "Separation",
        description: "A heartfelt exploration of the pain of separation and the longing for reunion, capturing the emotional turmoil of distance in relationships."
    },
    {
        title: "Better Not to Know",
        url: "/poems/notknow.html",
        category: "introspection",
        subcategory: "Awareness",
        description: "A contemplative piece reflecting on the nature of knowledge and the comfort of ignorance."
    },
    {
        title: "The Departure of My Yearning",
        url: "/poems/specture.html",
        category: "introspection",
        subcategory: "Longing",
        description: "A poignant exploration of the delicate nature of human existence, capturing the interplay between strength and fragility."
    },
    {
        title: "Human Fragility",
        url: "/poems/fragility.html",
        category: "introspection",
        subcategory: "Vulnerability",
        description: "A poignant exploration of the delicate nature of human existence, capturing the interplay between strength and fragility."
    },

    {
        title: "The Reflection I Watch",
        url: "/poems/reflection.html",
        category: "swostika",
        subcategory:"sangam",
description: "The Reflection I Watch is a poem of quiet longing, observing two souls intertwined in a dance of love and flight—a perfect reflection that highlights the watcher's own lonely shore.",
    },

    {
        title: "My Old Lady",
        url: "/poems/oldlady.html",
        category: "swostika",
        subcategory: "personality",
        description: "A poem celebrating a partner whose wit, charm, and unpredictability make her feel older, wiser, and wonderfully untamed."
    },
    {
        title: "Essence Dissipating",
        url: "/poems/essence.html",
        category: "introspection",
        subcategory: "Despair",
        description:"A beginning exploration of suffering, fate, and inner decay. It contrasts the purity with the brokenness of the self, portraying existence as a futile crawl toward peace that never comes."   
     },
    {
        title: "Far Below Her Peak",
        url: "/poems/belowherpeak.html",
        category: "swostika",
        subcategory: "admiration",
        description: "A poem describing the interplay between a moon-like princess, her surroundings and me , a mere passenger."
    },
    {
        title: "Witty One Around Me",
        url: "/poems/witty.html",
        category: "tulsa",
        subcategory: "humor",
        description: "A playful exploration of a charming personality, capturing the essence of wit and humor in everyday life."
    },
    {
         title: "Journey Blessed With Lies",
         url: "/poems/truthnlie.html",
         category: "introspection",
         subcategory: "Lies a mile away",
         description: "A poem about the struggle between me and writing where I write my lies thinking its true. A fatal flaw filled with an illusion of truth."
    },
    {
        title: "Bones, Skin and Flesh",
        url: "/poems/bones.html",
        category: "Fang Yuan",
        subcategory: "novel",
        description: "This poem explores the relationship between physical appearance and inner essence, emphasizing the equality of all human beings."
    },
    {
        title: "Remores Of Begin Lost",
        url: "/poems/fly.html",
        category: "life",
        subcategory: "Loneliness",
        description: "A poem that captures the essence of love and longing, expressed through the metaphor of flying towards the sky."
    },

    {
        title: "Between Smiles and Hesitation",
        url: "/poems/myinspiration.html",
        category: "swostika",
        subcategory: "moments",
        description: "This poem is a tender reflection on a fleeting, friendly moment shared with someone deeply cherished. It captures the quiet magic of walking and talking together."
    },

    {
        title: "A Seed of Dream",
        url: "/poems/seedbreached.html",
        category: "introspection",
        description: " A poem that explores the journey of growth and self-discovery, likening it to a seed breaking through the soil."
    },

    {
        title: "Two Enchantresses",
        url: "/poems/twoenchantress.html",
        category: "Tulsa",
        subcategory:" Swostika",
        description: "This poem explores the duality of human nature, depicting the struggle between opposing forces."
    },

    { title: "Hanging Monkey",
         url: "/poems/monkey.html",
         category: "introspection",
         description: "A poem that captures the feeling of being in a chaotic situation, like hanging on a bus, and the longing for stability and peace." },

    { title: "Vibration with Melody",
         url: "/poems/melody.html", 
         category: "love",
            subcategory: "classmates",
         description: "A poem that captures the essence of love through the metaphor of music, exploring the deep connection between two souls." },
         
{ title: "Haami Saathi Hau",
         url: "/poems/hamisathi.html",
         category: "friendship",
         subcategory: "admiration",
         description: "This poem reflects on the bond of friendship, exploring the unspoken understanding and connection between two people."
     },

     { title: "Dyed in Your Color",
         url: "/poems/dyed.html",
         category: "love",
          description: "This poem explores the theme of love and how it can change one's perception of self."
     },
     
     { title: "Mero Sapana",
         url: "/poems/merosapana.html", 
         category: "love",
          description: "This poem wish the person would come, call their name, and acknowledge their love just once. Even when close, the distance remains, yet the speaker keeps watching, waiting." },

    { title: "Captive In House",
         url: "/poems/captive.html",
         category: "introspection",
          description: "This poem reflects on the feeling of being trapped within one's own mind, exploring themes of isolation and self-discovery." },

    { title: "Shadows of Classmates",
         url: "/poems/classhadow.html",
         category:"Classmate of class",
         subcategory: "friendship",
          description: "This poem explores the complex emotions of friendship and the shadows that can linger between classmates." },
   
          { title: "Prayer of Decay",
         url: "/poems/decay.html",
         category: "introspection",
          description: "This poem delves into the themes of decay and renewal, reflecting on the passage of time and the inevitability of change." },

    { title: "Spilling Secrets Like Water",
         url: "/poems/height.html",
         category: "introspection",
         subcategory: "Answer to her",
          description: "This poem reflects on the act of sharing one's innermost thoughts and feelings, exploring the vulnerability and strength that comes with it." },

    { title: "Ring and Dream",
         url: "/poems/callring.html",
         category: "life",
          description: "This poem explores the dreamlike state of love, where reality blurs with fantasy, and the heart yearns for connection." },

  { title: "Mental Age Thirty-Two",
         url: "/poems/sbirth32.html",
         category: "swostika",
          description: "This poem reflects on the complexities of mental age and maturity, exploring the disconnect between physical and emotional growth." },

    { title: "Misery Loop",
         url: "/poems/loop.html",
         category: "love",
          description: "This poem delves into the depths of despair and the feeling of being trapped in a never-ending cycle of misery." },

    { title: "The Burning Train",
         url: "/poems/train.html",
         category: "love",
          description: "On a burning train, two souls travel together, both smiling through the chill of despair, dreaming of freedom while bound by chains." },

    { title: "Until I Die I Care",
         url: "/poems/untildie.html",   
            category: "introspection",
          description: "A poignant exploration of love and friendship, capturing the essence of caring for someone until the very end." },

    { title: "Hunter Goodbye",
         url: "/poems/hunter.html",
         category: "love",
          description: "A gripping tale of survival and the primal instincts that drive us in the face of danger." },

    { title: "Innocence of Friend",
         url: "/poems/night.html",
         category: "friendship",
          description: "A heartfelt exploration of the bonds of friendship and the innocence that comes with it." },
  
    { title: "Stray Away From You",
         url: "/poems/stray.html", 
         category: "love",
          description: "This poem explores the feeling of longing and the desire to connect with someone special." },

    { title: "Terror of Person",
         url: "/poems/terror.html", 
         category: "Friendship",
          description: "This poem depicts a figure consumed by darkness, devouring even the kindest souls, surrounded by demons obsessed with his presence." },

    { title: "Afraid",
         url: "/poems/afraid.html", 
         category: "love",
          description: "A vulnerable confession of fear and longing, reaching out to someone special in moments of darkness." },
   
          { title: "A Friend for a Moment, a Stranger the Next", 
            url: "/poems/afriend.html", 
            category: "life",
             description: "A moment that someone tells who you are in front of others." },
  
          { title: "Shadow of People Around", url: "/poems/aperson.html", category: "life", description: "Exploring the unseen influence of those around us, this poem delves into the subtle ways people shape our lives and emotions." },
    { title: "Child / Baalak", url: "/poems/baalak.html", category: "family", description: "A poignant tale of childhood, hunger, and loss told through the eyes of innocence." },
    { title: "Beggers", url: "/poems/beggers.html", category: "life", description: "A raw exploration of survival, desperation, and the harsh realities of life on the margins." },
    { title: "Bride", url: "/poems/bride.html", category: "love", description: "A tender love poem celebrating the beauty and promise of eternal devotion." },
    {
         title: "Care",
          url: "/poems/care.html",
           category: "Tulsa", 
           description: "A heartfelt reflection on friendship, care, and the burden of being cared for." 
        },
    { title: "Confusion", url: "/poems/confusion.html", category: "introspection", description: "Navigating the storms of uncertainty and the complexity of human emotions." },
    { title: "Cry", url: "/poems/cry.html", category: "life", description: "A compassionate witness to tears and sorrow, offering silent comfort and understanding." },
    { title: "She Who Lives Behind the Curtain", url: "/poems/curtain.html", category: "Swostika", description: "A mysterious presence, hidden yet ever-present, observing the world from behind the veil." },
    { title: "The Soul, Ignited by Water", url: "/poems/cycle.html", category: "life", description: "A meditation on renewal and transformation, where water becomes the spark that awakens the soul's deepest potential." },
    { title: "Dear", url: "/poems/dear.html", category: "love", description: "A heartfelt letter of longing, frustration, and the pain of unspoken love." },
    { title: "Dear Me", url: "/poems/dearme.html", category: "introspection", description: "A conversation with the self about lost hope, invisible love, and the pain of watching from afar." },
    { title: "Death", url: "/poems/death.html", category: "life", description: "Contemplating mortality and the meaning of existence in the face of life's end." },
    { title: "Delusion", url: "/poems/delusion.html", category: "introspection", description: "Exploring the blurred lines between reality and perception in human relationships." },
    { title: "The Demon Behind My Friend", url: "/poems/demon.html", category: "friendship", description: "A dark exploration of jealousy and anger growing within a friendship." },
    { title: "Departure", url: "/poems/depature.html", category: "love", description: "The silent heartbreak of loving someone from afar, knowing you will never reach them." },
    { title: "Divine", url: "/poems/divine.html", category: "spirituality", description: "A spiritual journey seeking peace and divine guidance in times of suffering." },
    { title: "A Closed Door To Heart", url: "/poems/door.html", category: "love", description: "Waiting at the threshold of someone's heart, hoping for acceptance and understanding." },
    { title: "A Demon and a Drunkard", url: "/poems/drunkad.html", category: "life", description: "A tale of inner battles and the search for redemption in the shadows of love." },
    { title: "Dubī Rānī Dungā", url: "/poems/dunga.html", category: "introspection", description: "A Nepali poem about feeling lost and drowning in one's own dreams and confusion." },
    { title: "Emotion", url: "/poems/emotion.html", category: "introspection", description: "Raw feelings and emotional journeys expressed through verse and self-reflection." },
    { title: "Loveletter to My Executioner", url: "/poems/executioner.html", category: "life", description: "A letter of longing and acceptance, written to the one who brings both an end and a strange kind of peace." },
    { title: "Expectation", url: "/poems/expectation.html", category: "introspection", description: "Dreams and hopes waiting to be fulfilled, exploring the weight of expectations." },
    { title: "Face", url: "/poems/face.html", category: "introspection", description: "A raw self-reflection on appearance, self-worth, and the pain of self-perception." },
    { title: "Fear", url: "/poems/fear.html", category: "life", description: "Confronting the fears that hold us back and the courage needed to overcome them." },
    { title: "Feeling", url: "/poems/feeling.html", category: "love", description: "Exploring the complex emotions between a girl and a boy, emptiness and fulfillment." },
    { title: "Flying", url: "/poems/flying.html", category: "love", description: "Soaring high in the sky, observing love and connection from a distance." },
    { title: "Fool in Me", url: "/poems/fool.html", category: "introspection", description: "A deep reflection on foolishness, self-doubt, and the search for meaning in relationships." },
    { title: "For Me", url: "/poems/forme.html", category: "friendship", description: "A contemplation on friendship, loneliness, and the search for genuine connection." },
    { title: "Friend I See", url: "/poems/friendisee.html", category: "friendship", description: "A letter to a once-cherished friend, now strained by jealousy and misunderstanding." },
    { title: "Girl I See", url: "/poems/girli.html", category: "love", description: "A heartfelt journey of admiration and longing for someone special from afar." },
    { title: "The God", url: "/poems/god.html", category: "spirituality", description: "A deeply emotional reflection on faith, guilt, and the relationship with the divine." },
    { title: "A Goddess and Her Apostle", url: "/poems/goddness.html", category: "life", description: "An ode to devotion and admiration, where love takes on mythical proportions." },
    { title: "Goodbye", url: "/poems/goodbye.html", category: "love", description: "A collection of farewells and the emotions they carry, bidding farewell to an imaginary love." },
    { title: "Day With You In My Grave", url: "/poems/grave.html", category: "life", description: "A reflection on love that lingers beyond loss, where memories rest quietly in the heart's deepest places." },
    { title: "Hanging Words", url: "/poems/hanging.html", category: "introspection", description: "Words left hanging in the air, exploring loss, truth, and the weight of unspoken feelings." },
    { title: "Happy", url: "/poems/happy.html", category: "introspection", description: "Observing happiness in others while struggling with inner emptiness and the search for identity." },
    { title: "Healing", url: "/poems/healing.html", category: "life", description: "Words of healing and recovery, finding strength in vulnerability and the passage of time." },
    { title: "Hell", url: "/poems/hell.html", category: "spirituality", description: "A dark vision of hell and damnation, exploring themes of sin and eternal punishment." },
    { title: "Blood sprayed — like scattered paint", url: "/poems/hollow.html", category: "life", description: "A vivid exploration of pain and transformation, where moments of suffering leave marks that shape who we become." },
    { title: "Hope", url: "/poems/hope.html", category: "love", description: "A heartfelt exploration of hope, disappointment, and the pain of unmet expectations in love." },
    { title: "Hospital", url: "/poems/hospital.html", category: "life", description: "Observations from a hospital visit, reflecting on pain, suffering, and human resilience." },
    { title: "Illusion", url: "/poems/illusion.html", category: "introspection", description: "A journey through imagination and dreams, where reality blends with fantasy and desire." },
    { title: "Inspiration or Parasite", url: "/poems/inspiration.html", category: "life", description: "Exploring the fine line between inspiration and dependence in relationships and creativity." },
    { title: "Jade Without Light", url: "/poems/jade.html", category: "love", description: "A meditation on love's beauty fading in absence, where cherished moments become precious yet distant memories." },
    { title: "Jealousy", url: "/poems/jealousy.html", category: "love", description: "Exploring the complex emotions of desire, envy, and the pain of watching from the sidelines." },
    { title: "Last Closure", url: "/poems/last.html", category: "introspection", description: "A final note acknowledging the fictional nature of the poems and seeking closure." },
    { title: "Love & Affection", url: "/poems/love.html", category: "love", description: "Verses celebrating the beauty and complexity of love in all its forms." },
    { title: "Love", url: "/poems/loveifell.html", category: "love", description: "A confession of regrets, unfulfilled dreams, and a deep wish to protect and uplift." },
    { title: "Ma Jasto", url: "/poems/majasto.html", category: "love", description: "A Nepali love poem expressing deep affection and the desire to be close to someone special." },
    { title: "Marry", url: "/poems/mary.html", category: "love", description: "A beautiful dream of marriage and lifelong companionship with intense devotion." },
    { title: "Me", url: "/poems/me.html", category: "introspection", description: "A deep self-reflection on identity, worthiness, and the struggle to connect with others." },
    { title: "Mero Mann", url: "/poems/meroman.html", category: "introspection", description: "A Nepali poem about the heart's confusion and the pain of unspoken feelings." },
    { title: "Moments", url: "/poems/moments.html", category: "life", description: "Flooded silence and the burning desire to create meaningful moments with others." },
    { title: "Mother", url: "/poems/mother.html", category: "family", description: "A deeply emotional reflection on a child's transformation and a mother's silent strength." },
    { title: "Chasing Light, Finding Dark", url: "/poems/night.html", category: "life", description: "A journey through contrasts—seeking hope in darkness and discovering meaning in the shadows of night." },
    { title: "Personification of Illusion", url: "/poems/personification.html", category: "introspection", description: "Illusion personified as a distant figure, exploring the relationship between reality and dreams." },
    { title: "Question and Answer", url: "/poems/queandans.html", category: "love", description: "A dialogue between a girl and a boy, exploring questions of love, fear, and understanding." },
    { title: "Reality", url: "/poems/reality.html", category: "introspection", description: "Exploring the differences between boys and girls, and the complex reality of relationships." },
    { title: "The Way Of Changing Person", url: "/poems/relative.html", category: "life", description: "A contemplation on how people evolve over time, shaped by experiences, relationships, and the passage of life." },
    { title: "Crying Mother on Her Fall", url: "/poems/ritual.html", category: "life", description: "A poignant reflection on loss and resilience, capturing a mother's sorrow and the quiet strength that follows her fall." },
    { title: "Show Off", url: "/poems/showoff.html", category: "introspection", description: "A brief reflection on desire, longing, and the differences between people." },
    { title: "Silently", url: "/poems/silently.html", category: "life", description: "A quiet departure from pain, choosing to leave silently without waiting for anyone." },
    { title: "Sorry", url: "/poems/sorry.html", category: "introspection", description: "A profound apology for existence, pain caused, and the destruction of built dreams." },
    { title: "Stone", url: "/poems/stone.html", category: "introspection", description: "A declaration of acceptance, choosing to remain as stone rather than be polished into something else." },
    { title: "Sunlight", url: "/poems/sunlight.html", category: "love", description: "The phase of seeing - being a candle in the night while the beloved seeks sunlight." },
    { title: "Tao of Two People", url: "/poems/tao.html", category: "Sandip",
        subcategory:"Swostika", 
         description: "A poetic journey through the balance and harmony found between two souls." },
    { title: "Therapy for the Lost", url: "/poems/therapy.html", category: "life", description: "Finding therapy in connection, exploring the turbulence of emotions and the search for peace." },
    { title: "Thinking", url: "/poems/thinking.html", category: "spirituality", description: "Fear of thoughts being read, searching for God, and the cracking of worn masks." },
    { title: "Three Soul", url: "/poems/threesoul.html", category: "love", description: "A garden for ghosts, exploring the dynamics between three souls in a complex relationship." },
    { title: "Too Soon Too Late", url: "/poems/toosoon.html", category: "love", description: "The crystal-like tear of timing - getting too close was a mistake, staying too far was regret." },
    { title: "Trapped in the Web", url: "/poems/trapped.html", category: "life", description: "A spider web, trapped in illusion where exiting means jumping to another loop." },
    { title: "Fairy / Upshara", url: "/poems/upshara.html", category: "love", description: "A Nepali poem comparing the beloved to a fairy or celestial being from heaven." },
    { title: "Vamara / Bee", url: "/poems/vamara.html", category: "love", description: "A Nepali poem using the metaphor of a bee and flower to explore love and longing." },
    { title: "Veil", url: "/poems/veil.html", category: "love", description: "The lifting of veils and masks to reveal the real person beneath, aged and thorny yet beloved." },
    { title: "A Whisper at the End", url: "/poems/whisper.html", category: "love", description: "A tender memory etched in time, a moment that lived in me." },
    { title: "When I Came to See You", url: "/poems/whenicame.html", category: "life", description: "Poetic reflections on anime scenes and the memory of someone who has passed away." },
    { title: "Boy", url: "/poems/yourboy.html", category: "love", description: "Reflections on unspoken feelings of jealousy, rejection, and quiet heartbreak." }
];

// Initialize pagination when DOM is loaded
let poemPagination;
document.addEventListener('DOMContentLoaded', function() {
    poemPagination = new PoemPagination(poemsData, 25);
});