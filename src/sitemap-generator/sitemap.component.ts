import { Component, OnInit } from '@angular/core';
import { SitemapService } from './sitemap.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css'],
})
export class SitemapComponent implements OnInit {
  sitemapContent: string | null = null;

  constructor(private sitemapService: SitemapService) {}

  async ngOnInit(): Promise<void> {
    this.sitemapContent = await this.sitemapService.generateSitemap();
  }

  downloadSitemap(): void {
    if (this.sitemapContent) {
      const blob = new Blob([this.sitemapContent], { type: 'application/xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'sitemap.xml';
      link.click();
    }
  }
}
