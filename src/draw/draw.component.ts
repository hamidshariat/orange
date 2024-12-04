import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  inject,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatList, MatListItem, MatListItemLine } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatRipple } from '@angular/material/core';
import { shapeData } from '../data/draw.constant';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatTooltip} from '@angular/material/tooltip';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-draw',
  imports: [
    CommonModule,
    MatIconModule,
    HeaderComponent,
    MatList,
    MatListItem,
    MatListItemLine,
    MatDividerModule,
    MatRipple,
    MatIconButton,
    MatMenu,
    MatMenuTrigger,
    MatTooltip,
    RouterLink,
  ],
  templateUrl: './draw.component.html',
  standalone: true,
  styleUrl: './draw.component.css',
})
export class DrawComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef;
  @ViewChild('addShapeDialog') addShapeDialog!: TemplateRef<unknown>;

  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private tool = 'pen';
  private color = '#000000';
  public size = 5;
  private restore_array: ImageData[] = [];
  private index = -1;
  dialog = inject(MatDialog);
  public activeTool: string = '';
  selectedColor: string = '#000000';


  penTypes = [
    { name: 'Pencil', lineWidth: 1, strokeStyle: '#000000', globalAlpha: 1 },
    { name: 'Marker', lineWidth: 5, strokeStyle: '#000000', globalAlpha: 1 },
    {
      name: 'Highlighter',
      lineWidth: 15,
      strokeStyle: '#FFFF00',
      globalAlpha: 0.1,
    },
    { name: 'Brush', lineWidth: 10, strokeStyle: '#000000', globalAlpha: 1 },
  ];
  selectedPenType = this.penTypes[0];

  isPenDropdownOpen = false;

  toolTypes = [
    { name: 'AddSticker' },
    { name: 'AddText' },
    { name: 'AddSignture' },
    { name: 'AddShape' },
  ];
  selectedToolType = this.toolTypes[0];

  isToolDropdownOpen = false;

  ngAfterViewInit() {
    this.initCanvas();
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    if (!this.ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.ctx.lineWidth = this.size;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = this.color;

    canvas.addEventListener('mousedown', (e: MouseEvent) =>
      this.startDrawing(e),
    );
    canvas.addEventListener('mousemove', (e: MouseEvent) => this.draw(e));
    canvas.addEventListener('mouseup', (e: MouseEvent) => this.stopDrawing(e));
    canvas.addEventListener('mouseout', (e: MouseEvent) => {
      if (this.isDrawing) this.stopDrawing(e);
    });

    canvas.addEventListener('touchstart', (e: TouchEvent) =>
      this.startDrawing(e),
    );
    canvas.addEventListener('touchmove', (e: TouchEvent) => this.draw(e));
    canvas.addEventListener('touchend', (e: TouchEvent) => this.stopDrawing(e));
    canvas.addEventListener('touchcancel', (e: TouchEvent) => {
      if (this.isDrawing) this.stopDrawing(e);
    });
  }

  private startDrawing(event: MouseEvent | TouchEvent) {
    this.isDrawing = true;
    const { offsetX, offsetY } = this.getEventPosition(event);
    this.ctx.beginPath();
    this.ctx.moveTo(offsetX, offsetY);
  }

  draw(event: MouseEvent | TouchEvent) {
    if (!this.isDrawing) return;
    const { offsetX, offsetY } = this.getEventPosition(event);
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
  }

  stopDrawing(event?: MouseEvent | TouchEvent) {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    this.ctx.closePath();

    const canvas = this.canvasRef.nativeElement;
    const imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (this.index < this.restore_array.length - 1) {
      this.restore_array = this.restore_array.slice(0, this.index + 1);
    }

    this.restore_array.push(imageData);
    this.index = this.restore_array.length - 1;
  }

  undoLast() {
    if (this.index > 0) {
      this.index--;
      this.ctx.putImageData(this.restore_array[this.index], 0, 0);
    } else if (this.index === 0) {
      this.clearCanvas();
      this.index = -1;
    }
  }

  clearCanvas() {
    const canvas = this.canvasRef.nativeElement;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    const blankImageData = this.ctx.createImageData(
      canvas.width,
      canvas.height,
    );
    if (this.index === this.restore_array.length - 1) {
      this.restore_array.push(blankImageData);
      this.index = this.restore_array.length - 1;
    }
  }

  redoLast() {
    if (this.index < this.restore_array.length - 1) {
      this.index++;
      const canvas = this.canvasRef.nativeElement;
      this.ctx.putImageData(this.restore_array[this.index], 0, 0);
    }
  }

  pencil(){
    this.activeTool = 'pencil';
    if (!this.ctx) return;
    this.setTool('pen');

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = this.selectedColor;
    this.ctx.globalAlpha = 1;

    const colorInput: HTMLInputElement | null = document.querySelector('input[type="color"]');
    if (colorInput) {
      colorInput.value = this.selectedColor;
    }
  }

  Brush(){
    this.activeTool = 'brush';
    if (!this.ctx) return;
    this.setTool('pen');

    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = this.selectedColor;
    this.ctx.globalAlpha = 1;

    const colorInput: HTMLInputElement | null = document.querySelector('input[type="color"]');
    if (colorInput) {
      colorInput.value = this.selectedColor;
    }
  }

  Highlighter(){
    this.activeTool = 'highlighter';
    if (!this.ctx) return;
    this.setTool('pen');

    this.ctx.lineWidth = 15;
    this.ctx.strokeStyle = '#FFFF00';
    this.ctx.globalAlpha = 0.1;

    const colorInput: HTMLInputElement | null = document.querySelector('input[type="color"]');
    if (colorInput) {
      colorInput.value = '#FFFF00';
    }
  }

  Marker(){
    this.activeTool = 'marker';
    if (!this.ctx) return;
    this.setTool('pen');

    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = this.selectedColor;
    this.ctx.globalAlpha = 1;

    const colorInput: HTMLInputElement | null = document.querySelector('input[type="color"]');
    if (colorInput) {
      colorInput.value = this.selectedColor;
    }
  }

  private getEventPosition(event: MouseEvent | TouchEvent) {
    const canvas = this.canvasRef.nativeElement;
    if ('touches' in event) {
      const touch = event.touches[0];
      return {
        offsetX: touch.clientX - canvas.offsetLeft,
        offsetY: touch.clientY - canvas.offsetTop,
      };
    }
    return { offsetX: event.offsetX, offsetY: event.offsetY };
  }

  changeColor(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.selectedColor = input.value;

      if (this.ctx) {
        this.ctx.strokeStyle = this.selectedColor;
      }
    }
  }

  changeSize(event: any) {
    if (!this.ctx) return;
    this.size = event.target.value;
    this.ctx.lineWidth = this.size;
  }

  togglePenDropdown() {
    this.isPenDropdownOpen = !this.isPenDropdownOpen;
  }

  toggleToolDropdown() {
    this.isToolDropdownOpen = !this.isToolDropdownOpen;
  }

  setTool(tool: string) {
    if (!this.ctx) return;
    this.tool = tool;

    if (this.tool === 'eraser') {
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.lineWidth = 10;
      this.ctx.globalAlpha = 1;
      this.activeTool = 'eraser';
    } else {
      this.ctx.globalCompositeOperation = 'source-over';

      this.ctx.lineWidth = this.selectedPenType.lineWidth;
      this.ctx.strokeStyle = this.selectedPenType.strokeStyle;
      this.ctx.globalAlpha = this.selectedPenType.globalAlpha;

      const colorInput: HTMLInputElement | null = document.querySelector(
        'input[type="color"]',
      );
      if (colorInput) {
        colorInput.value = this.selectedPenType.strokeStyle;
      }
    }
  }

  setPenType(pen: any) {
    if (!this.ctx) return;
    this.selectedPenType = pen;

    this.setTool('pen');

    this.ctx.lineWidth = pen.lineWidth;
    this.ctx.strokeStyle = pen.strokeStyle;
    this.ctx.globalAlpha = pen.globalAlpha;

    const colorInput: HTMLInputElement | null = document.querySelector(
      'input[type="color"]',
    );
    if (colorInput) {
      colorInput.value = pen.strokeStyle;
    }

    this.isPenDropdownOpen = false;
  }

  setToolType(tool: any) {
    if (!this.ctx) return;
    this.selectedPenType = tool;

    this.setTool('tool');

    this.isToolDropdownOpen = false;
  }

  drawShape(shape: string) {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 100;

    ctx.beginPath(); // Start a new path for the shape

    switch (shape) {
      case 'square':
        ctx.rect(centerX - size / 2, centerY - size / 2, size, size);
        break;
      case 'circle':
        ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
        break;
      case 'triangle':
        ctx.moveTo(centerX, centerY - size / 2);
        ctx.lineTo(centerX - size / 2, centerY + size / 2);
        ctx.lineTo(centerX + size / 2, centerY + size / 2);
        ctx.closePath();
        break;
      case 'rhombus':
        ctx.moveTo(centerX, centerY - size / 2);
        ctx.lineTo(centerX - size / 2, centerY);
        ctx.lineTo(centerX, centerY + size / 2);
        ctx.lineTo(centerX + size / 2, centerY);
        ctx.closePath();
        break;
    }
    this.dialog.closeAll();
    ctx.stroke(); // Draw the shape
  }

  openShapeDialog() {
      this.dialog.open(this.addShapeDialog, {
        width: '460px',
      });

  }

  downloadDraw() {
    const dataUrl = this.canvasRef.nativeElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'draw.png';
    link.click();
  }

  protected readonly shapeData = shapeData;
}
