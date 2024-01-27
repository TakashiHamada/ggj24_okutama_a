var app = new Vue({
    el: '#app',
    data: {
        userInput: '',
        state: 'init',
        answer: '',
        explanation: '',
        image: 'image/goblin.jpg',
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
            
            let url = "https://demo.cotonoha.io/ggj2024/homekotoba";

            const response = await axios.get(url, {
                params: {
                    character: "goblin",
                    message: value,
                }
            });

            this.state = "finish";
            this.answer = "=>" + response.data.answer;
            this.explanation = "=>" + response.data.explanation;
        },
        playSe(fileName) {
            var sound = new Howl({
                src: ['se/' + fileName + '.mp3']
            });

            sound.play();
        }
    }
})