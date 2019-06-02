import {Component, Input} from '@angular/core';
import {PhotographersService} from '../../../providers/photographers/photographers.service';
import {Observable} from 'rxjs';
import {Photographer} from '../../../interfaces/photographer';
import {Picture} from '../../../interfaces/picture';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SignalRService} from '../../../providers/signal-r/signal-r.service';

@Component({
    selector: 'app-image-details',
    templateUrl: './image-details.component.html',
    styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent {

    private iptcForm: FormGroup;
    private exifForm: FormGroup;
    private photographerForm: FormGroup;
    
    private photographers$: Observable<Photographer[]>;
    private activeImage: Picture;

    @Input('activeImage') set setActiveImage(image: Picture) {
        let creator = null;
        let country = null;
        let source = null;
        
        
        let aperture = null;
        let focalLength = null;
        let exifVersion = null;
        
        if(image.metaData) {
            let metadataContent = image.metaData.data;
            if(metadataContent) {
                let creatorField = metadataContent.find(md => md.key === "Creator");
                creator = creatorField ? creatorField.value : '';
                let countryField = metadataContent.find(md => md.key === "Country");
                country = countryField ? countryField.value : '';
                let sourceField = metadataContent.find(md => md.key === "Source");
                source = sourceField ? sourceField.value : '';
                
                
                let apertureField =  metadataContent.find(md => md.key === "Aperture");
                aperture = apertureField ? apertureField.value : '';
                let focalLengthField =  metadataContent.find(md => md.key === "FocalLength");
                focalLength = focalLengthField ? focalLengthField.value : '';
                let exifVersionField =  metadataContent.find(md => md.key === "ExifVersion");
                exifVersion = exifVersionField ? exifVersionField.value : '';
            }
        }
        
        this.iptcForm.reset({
            creator: creator,
            country: country,
            source: source
        });

        this.exifForm.reset({
            aperture: aperture,
            focalLength: focalLength,
            exifVersion: exifVersion
        });
        
        
        // extract and reset for photographer tab
        let photographerID = null;

        if(image.photographer) {
            photographerID = image.photographer.id;
        }
        
        this.photographerForm.reset({
            photographerID: photographerID
        });
        
        // set the active image
        this.activeImage = image;
    }
    
    constructor(private photographers: PhotographersService,
                private fb: FormBuilder,
                private signalR: SignalRService,
                private photographerService: PhotographersService) {
        this.photographers$ = photographers.photographers$;

        
        
        this.iptcForm = fb.group({
            creator: '',
            country: '',
            source: ''
        });
        
        this.exifForm = fb.group({
            aperture: '',
            focalLength: '',
            exifVersion: ''
        });
        
        this.photographerForm = fb.group({
            photographerID: null
        });
        
    }
    


    updatePhotographer() {
        const value = this.photographerForm.value;
        this.photographerService.getPhotographer(value.photographerID).subscribe(
            p => {
                this.activeImage.photographer = p;
                this.signalR.update(this.activeImage);
                this.iptcForm.markAsPristine();
                this.iptcForm.markAsUntouched();
            } 
        );
    }
    
    updateIPTC() {
        const value = this.iptcForm.value;
        this.activeImage.metaData.data.find(md => md.key === "Creator").value = value.creator;
        this.activeImage.metaData.data.find(md => md.key === "Country").value = value.country;
        this.activeImage.metaData.data.find(md => md.key === "Source").value = value.source;
        this.signalR.update(this.activeImage);
        this.iptcForm.markAsPristine();
        this.iptcForm.markAsUntouched();
    }
    
    updateEXIF() {
        const value = this.exifForm.value;
        this.activeImage.metaData.data.find(md => md.key === "Aperture").value = value.aperture;
        this.activeImage.metaData.data.find(md => md.key === "FocalLength").value = value.aperture;
        this.activeImage.metaData.data.find(md => md.key === "ExifVersion").value = value.aperture;
        this.signalR.update(this.activeImage);
        this.iptcForm.markAsPristine();
        this.iptcForm.markAsUntouched();
    }
    
    
    
}
