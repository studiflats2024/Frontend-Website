import { Component } from '@angular/core';

@Component({
  selector: 'app-aprt-photos',
  templateUrl: './aprt-photos.component.html',
  styleUrls: ['./aprt-photos.component.css']
})
export class AprtPhotosComponent {
  images: any[] = [];
  draggedImage: any;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  onImageSelect(event: any) {
    for (let file of event.files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push({
          src: e.target.result,
          alt: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  onDragStart(event: any, img: any) {
    this.draggedImage = img;
  }

  onDrop(event: any, index: number) {
    if (this.draggedImage) {
      const draggedIndex = this.images.indexOf(this.draggedImage);
      this.images.splice(draggedIndex, 1); // Remove from original position
      this.images.splice(index, 0, this.draggedImage); // Insert at new position
      this.draggedImage = null; // Reset
    }
  }

  onDragEnd(event: any) {
    this.draggedImage = null;
  }

  onDragEnter(event: any, index: number) {
    // Optional: Handle visual effects for drag over
  }

}
