import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';

import { environment } from '../environments/environment'
import { HttpHeaders } from '@angular/common/http';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'appsss';
    @ViewChild('fileInput') fileInput;
    selectedImage = "";
    selectedImageName = "";
    emotionGif = "";

    constructor(private httpClient: HttpClient) {


    }
    upload(file) {

        const options = {
            headers: new HttpHeaders().append('Ocp-Apim-Subscription-Key', environment.Key1)
                .append("Content-Type", "application/octet-stream")
        };

        this.httpClient.post(environment.emotionAPI, this.makeBlob(file), options)
            .subscribe((res) => {
                console.log(res);


            }, (err) => {
                console.log(err);
            }, () => {
                // complete
            });
    }

    onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];

            this.selectedImageName = file.name;
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.selectedImage = reader.result;
                this.upload(this.selectedImage);
            };
        }
    }

    makeBlob(dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = decodeURIComponent(parts[1]);
            return new Blob([raw], { type: contentType });
        }
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }

}
