import {NameDisplayPipe} from './name-display.pipe';
import {Photographer} from '../interfaces/photographer';

describe('NameDisplayPipe', () => {
    it('create an instance', () => {
        const pipe = new NameDisplayPipe();
        expect(pipe).toBeTruthy();
    });
    
    it('should build correct name', () => {
        const pipe = new NameDisplayPipe();
        let p: Photographer = {
            id: 1,
            firstName: 'Viktor',
            lastName: 'Leher',
            birthday: new Date(),
            notes: 'test'
        };
        expect(pipe.transform(p)).toEqual("Viktor Leher");
    })
});
