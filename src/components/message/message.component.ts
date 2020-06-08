export class messageController implements ng.IComponentController {

    static $inject: string[] = ["$element"];

    constructor(private message: string, private playAgain: Function) {
    }
}

export class messageComponent implements ng.IComponentOptions {
    public templateUrl: string;
    public bindings: any;
    public controller: any;

    public constructor() {
        this.templateUrl = '../src/components/message/message.component.html';
        this.bindings = {
            message: '<',
            playAgain: '&'
        }
        this.controller = messageController;
    }
}