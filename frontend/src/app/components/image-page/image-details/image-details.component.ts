import {Component, Input} from '@angular/core';
import {PhotographersService} from '../../../providers/photographers/photographers.service';
import {Observable} from 'rxjs';
import {Photographer} from '../../../interfaces/photographer';
import {Picture} from '../../../interfaces/picture';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SignalRService} from '../../../providers/signal-r/signal-r.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEvent, MatChipInputEvent} from '@angular/material';
import {downloadFile, ReportService} from '../../../providers/report/report.service';

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

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    private visible = true;
    private selectable = true;
    private removable = true;
    private addOnBlur = true;
    
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
                private photographerService: PhotographersService,
                private reportService: ReportService) {
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

    async addTag(event: MatChipInputEvent) {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim() && this.activeImage.tags.indexOf(value.trim()) < 0) {
            this.activeImage.tags.push(value.trim());
            await this.updateImage();
        }
        if (input) {
            input.value = '';
        }
    }

    async removeTag(tag: MatChipEvent) {
        let v : string = tag.chip.value;
        v = v.replace("cancel", "").trim();
        const idx = this.activeImage.tags.indexOf(v);
        if (idx >= 0) {
            this.activeImage.tags.splice(idx, 1);
            await this.updateImage();
        }
    }
    
    updatePhotographer() {
        const value = this.photographerForm.value;
        this.photographerService.getPhotographer(value.photographerID).subscribe(
            async p => {
                this.activeImage.photographer = p;
                await this.updateImage();
                this.iptcForm.markAsPristine();
                this.iptcForm.markAsUntouched();
            } 
        );
    }

    async updateIPTC() {
        const value = this.iptcForm.value;
        this.activeImage.metaData.data.find(md => md.key === "Creator").value = value.creator;
        this.activeImage.metaData.data.find(md => md.key === "Country").value = value.country;
        this.activeImage.metaData.data.find(md => md.key === "Source").value = value.source;
        await this.updateImage();
        this.iptcForm.markAsPristine();
        this.iptcForm.markAsUntouched();
    }

    async updateEXIF() {
        const value = this.exifForm.value;
        this.activeImage.metaData.data.find(md => md.key === "Aperture").value = value.aperture;
        this.activeImage.metaData.data.find(md => md.key === "FocalLength").value = value.aperture;
        this.activeImage.metaData.data.find(md => md.key === "ExifVersion").value = value.aperture;
        await this.updateImage();
        this.iptcForm.markAsPristine();
        this.iptcForm.markAsUntouched();
    }

    updateImage() {
        return this.signalR.update(this.activeImage);
    }

    generateReport() {
        this.reportService.picReport(this.activeImage.pictureId).subscribe(
            blob => {
                downloadFile(blob, "report.pdf");
            }
        );
    }
}
