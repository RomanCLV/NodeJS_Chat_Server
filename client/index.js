const io = require("socket.io-client").io;

const PORT = 3000;
const urlApi = "http://localhost:" + PORT;

const socket = io(urlApi);
socket.on('new_message', (data) => {
    app.messages.push(data);
})

const app = new Vue({
    el: '#app',
    data() { 
        return {
            client_message: '',
            messages: [],
        };
    },
    computed: {
        str_messages() {
            let str = '';
            for (let msg of this.messages) {
                str += `[${msg.date}] ${msg.client}: ${msg.message}\n`;
            }
            return str;
        }
    },
    methods: {
        sendMessage() {
            socket.emit('send_message', { message: this.client_message });
            this.client_message = '';
        }
    }
})