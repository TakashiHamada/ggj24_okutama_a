var app = new Vue({
    el: '#app',
    data: {
        test_flg: false,
        userInput: '',
    },
    created: function () {
        this.test_flg = true;
        console.log("start");
        
        this.testApi();
    },
    methods: {
        async startGame() {
            // await playSe("locations/" + this.pile.filePrefix);
        },
        async onPushed() {
        },
        handleEnter() {
            console.log("Enterが押されました。入力されたテキスト:", this.userInput);
            this.testApi();
        },
        async testApi() {
            
        let id = "AKfycbzpKsGZaKQ_-3zsv7j4UGKA3Gm9A3YUXe5OavIIGeMyXNms5s8-kKpxESn1fbmoFqd8Rw";
        let url = "https://script.google.com/macros/s/" + id + "/exec";
        
        const response = await axios.get(url, {
            params: {
                a: this.userInput,
            }
        });
        
        
        
        console.log(response.data);
        
        }
    }
})