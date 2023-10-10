document.addEventListener('alpine:init', () => {


    Alpine.data('app', () => ({
        data: [{ txt: '', color: 0 }],
        stck: { txt: '', color: 0 },
        shiftPresed: false,
        colors: [
            ['#fff', '#111'], 
            ['#6eed2a', '#111'], 
            ['#fcfa5d', '#111'], 
            ['#f989d6', '#111'], 
            ['#20dff8', '#111'],
            ['#333', '#eee'],
        ],
        async init() {
            window.onbeforeunload = () => {
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].s === '') {
                        this.data.splice(i, 1);
                    }
                }
                this.save();
            }
            this.get();
            await this.$nextTick();
            document.querySelector('textarea:first-of-type').focus();
        },
        unshift(index) {
            if (index == 0) {                
                this.data.unshift(Object.assign({}, this.stck));
                this.save();
                // await this.$nextTick();
            }  
        },
        push(index) {
            if (this.data.length == (index + 1)) {
                this.data.push(Object.assign({}, this.stck));
                this.save();
            }
        },
       async splice(index) {
            if (this.data[index].txt.length == 0 && this.data.length > 1) {
                const previousEl = document.activeElement.previousElementSibling;
                this.data.splice(index, 1);
                this.save();
                await this.$nextTick();
                if (this.data.length && previousEl.nodeName == 'TEXTAREA') {
                    previousEl.focus();
                    previousEl.setSelectionRange(previousEl.value.length, previousEl.value.length);
                }

            }
        },
        insert(index) {
            console.log('insert', index);
        },
        color(index) {
            this.data[index].color = (this.data[index].color + 1) % this.colors.length;
        },
        get() {
            if (window.localStorage.getItem('stickies')) {
                const stickies = JSON.parse(window.localStorage.getItem('stickies'));
                if (stickies.length) {
                    this.data = stickies;
                }
            }
        },
        save() {
            const json = JSON.stringify(this.data);
            window.localStorage.setItem('stickies', json);
        }
    }));
});