import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ReportService {
    
    constructor(private http: HttpClient) {}

    public tagReport(): Observable<Blob> {
        let HTTPOptions = {
            headers: new HttpHeaders({
                'Accept':'application/pdf'
            }),
            'responseType': 'blob' as 'json'
        };
        return this.http.get<Blob>(`http://localhost:5000/report/tags`,  HTTPOptions);
    }

    public picReport(id: number) {
        let HTTPOptions = {
            headers: new HttpHeaders({
                'Accept':'application/pdf'
            }),
            'responseType': 'blob' as 'json'
        };
        return this.http.get(`http://localhost:5000/report/image/${id}`, HTTPOptions);
    }
}

export function downloadFile(blob, fileName) {
    const link = document.createElement('a');
    // create a blobURI pointing to our Blob
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    // some browser needs the anchor to be in the doc
    document.body.append(link);
    link.click();
    link.remove();
    // in case the Blob uses a lot of memory
    window.addEventListener('focus', e=>URL.revokeObjectURL(link.href), {once:true});
}



