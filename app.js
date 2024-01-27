var app = new Vue({
    el: '#app',
    data: {
        userInput: '',
        state: 'init',
        message: '',
    },
    created: function () {
    },
    methods: {
        handleEnter() {
            
            this.playSe("cat");
            
            this.state = "loading...";
            this.connectAip(this.userInput);
        },
        async connectAip(value) {
            let url = "https://demo.cotonoha.io:8000/homekotoba";

            const response = await axios.get(url, {
                params: {
                    character: "goblin",
                    message: value,
                }
            });

            this.state = "finish";
            this.message = response.data;
        },
        playSe(fileName) {
            var sound = new Howl({
                src: ['se/' + fileName + '.mp3']
            });

            sound.play();
        }
    }
})