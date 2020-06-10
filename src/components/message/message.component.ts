export class messageController implements ng.IComponentController {
    public message: string;
    public playAgain: Function;
}

export class messageComponent implements ng.IComponentOptions {
    public templateUrl: string = '../src/components/message/message.component.html';
    public bindings = {
        message: '<',
        playAgain: '&'
    };
    public controller: any = messageController;
}