import { Component,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  textInput: string = '';
  findText: string = '';
  replaceText: string = '';
  previewText: string = '';
  caseSensitive: boolean = false;

  ngAfterViewInit(): void {
    // Initializing Bootstrap tooltips
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new (window as any).bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  updatePreview(): void {
    this.previewText = this.textInput;
    if (this.findText) {
      const flags = this.caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(this.sanitizeForRegExp(this.findText), flags);
      this.previewText = this.textInput.replace(regex, (match) => `<mark>${this.replaceText}</mark>`);
    }
  }

  replaceTextInInput(): void {
    if (this.findText) {
      const flags = this.caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(this.sanitizeForRegExp(this.findText), flags);
      this.textInput = this.textInput.replace(regex, this.replaceText);
      this.updatePreview();
    }
  }

  reset(): void {
    this.textInput = '';
    this.findText = '';
    this.replaceText = '';
    this.previewText = '';
    this.caseSensitive = false;
  }

  private sanitizeForRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }}
