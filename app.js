var app = new Vue({
    el: '#app',
    data: {
        userInput: '',
        state:'init',
        message: '',
    },
    created: function () {
    },
    methods: {
        handleEnter() {
            this.state = "loading...";
            this.connectAip(this.userInput);
        },
        async connectAip(value) {
            
        let id = "AKfycbzpKsGZaKQ_-3zsv7j4UGKA3Gm9A3YUXe5OavIIGeMyXNms5s8-kKpxESn1fbmoFqd8Rw";
        let url = "https://script.google.com/macros/s/" + id + "/exec";
        
        const response = await axios.get(url, {
            params: {
                a: value,
            }
        });
        
        this.state = "finish";
        this.message = response.data;
        }
    }
})