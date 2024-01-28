var app = new Vue({
    el: '#app',
    data: {
        handleEnterPromise: null,
        userInput: '',
        state: 'init',
        answer: '',
        explanation: '',
        image: 'image/goblin.jpg',
        loadingMessage: '',
        enemy: 'goblin',
        anger: 100,
        life: 1000,
        inputDisable: true,
        waitForInputFlg: false,
    },
    computed: { // getter
    },
    created: async function () {

        this.enemyDamageEffect(3);

        while (true) {
            // 初期化
            this.userInput = "";
            this.waitForInputFlg = false;
            this.inputDisable= true;
            
            // enemy
            console.log("enemy");
            await this.enemyAttack();
            
            // player
            console.log("player");
            this.inputDisable = false;
            await this.waitForInput();
            
        }
    },
    methods: {
        async waitForInput() {
            while (!this.waitForInputFlg) {
                await this.delay(0.1);
            }
        },
        async handleEnter() {
            this.playSe("cat");
            this.updateLoadingMessage();
            await this.connectAip(this.userInput);

            this.waitForInputFlg = true;
        },
        async connectAip(value) {

            let url = "https://demo.cotonoha.io/ggj2024/homekotoba";

            const response = await axios.get(url, {
                params: {
                    character: "goblin",
                    message: value,
                }
            });

            this.state = "";
            this.answer = "=>" + response.data.answer;
            this.explanation = "=>" + response.data.explanation;
        },
        playSe(fileName) {
            var sound = new Howl({
                src: ['se/' + fileName + '.mp3']
            });

            sound.play();
        },
        updateLoadingMessage() {
            let messages = [
                "loadingMessage_A",
                "loadingMessage_B",
                "loadingMessage_C"
            ];
            this.loadingMessage = messages[Math.floor(Math.random() * messages.length)];
        },
        async enemyAttack() {
            await this.delay(1);
            this.life -= this.anger;
        },
        async enemyDamageEffect(times = 0, interval = 0.05) {
            for (let time = 0; time < times; time++) {

                this.image = 'image/goblin_damage.jpg';
                await this.delay(interval);
                this.image = 'image/goblin.jpg';
                await this.delay(interval);
            }
        },
        delay(n) {
            return new Promise(function (resolve) {
                setTimeout(resolve, n * 1000);
            });
        }
    }
})