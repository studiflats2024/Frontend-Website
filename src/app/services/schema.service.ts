import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    console.log(this.renderer)
  }

  addSchema(schema: object, id: string): void {
    this.removeSchema(id);

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(schema);

    this.renderer.appendChild(document.head, script);
  }

  removeSchema(id: string): void {
    const existingScript = document.getElementById(id);
    if (existingScript) {
      existingScript.remove();
    }
  }
}