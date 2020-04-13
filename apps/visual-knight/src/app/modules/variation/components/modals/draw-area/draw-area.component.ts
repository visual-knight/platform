import { Component, OnInit, Inject } from '@angular/core';
import Konva from 'konva';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteVariationModalComponent } from '../delete-variation/delete-variation.component';
import { IgnoreAreaType } from '../../../../core/types';
import { VariationService } from '../../../services/variation.service';

@Component({
  selector: 'visual-knight-draw-area',
  templateUrl: './draw-area.html',
  styleUrls: ['./draw-area.scss']
})
export class DrawAreaComponent implements OnInit {
  variationId: string;
  imageUrl: string;
  ignoreAreas: IgnoreAreaType[];
  rectangleList: Konva.Rect[] = [];
  stage: Konva.Stage;
  layer: Konva.Layer;

  constructor(
    private variationService: VariationService,
    public dialogRef: MatDialogRef<DeleteVariationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.variationId = data.variationId;
    this.imageUrl = data.imageUrl;
    this.ignoreAreas = data.ignoreAreas;
  }

  ngOnInit(): void {
    this.stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth * 0.9,
      height: window.innerHeight * 0.8
    });

    // add image onload callback
    const imageObj = new Image();
    imageObj.src = this.data.imageUrl;
    imageObj.onload = () => this.imageOnload(imageObj);
  }

  imageOnload(imageObj) {
    // create background layer
    this.layer = new Konva.Layer();

    // change stage size according to image
    this.stage.height(imageObj.height);
    this.stage.width(imageObj.width);

    const backgroundImage = new Konva.Image({
      image: imageObj
    });
    this.layer.add(backgroundImage);

    this.stage.add(this.layer);

    // draw all ignore areas
    this.ignoreAreas.forEach(ignoreArea => this.addRectangle(ignoreArea));
  }

  save() {
    const newIgnoreAreas: IgnoreAreaType[] = this.rectangleList.map(
      rectangle => {
        return {
          x: rectangle.x(),
          y: rectangle.y(),
          height: rectangle.height() * rectangle.scaleX(),
          width: rectangle.width() * rectangle.scaleY()
        };
      }
    );
    this.variationService.setNewIgnoreAreas(this.variationId, newIgnoreAreas);
    console.log(newIgnoreAreas);
  }

  addRectangle(ignoreArea: IgnoreAreaType) {
    const rectangle = new Konva.Rect({
      x: ignoreArea ? ignoreArea.x : 0,
      y: ignoreArea ? ignoreArea.y : 0,
      width: ignoreArea ? ignoreArea.width : 100,
      height: ignoreArea ? ignoreArea.height : 50,
      fill: 'gray',
      draggable: true,
      opacity: 0.6,
      dragBoundFunc: function(pos) {
        const component = this as Konva.Rect;
        const rectWidth = component.width() * component.scaleX();
        const rectHeight = component.height() * component.scaleY();
        const layerSize = component.getLayer().getSize();

        return {
          x: pos.x > 0 ? Math.min(layerSize.width - rectWidth, pos.x) : 0,
          y: pos.y > 0 ? Math.min(layerSize.height - rectHeight, pos.y) : 0
        };
      }
    });
    this.layer.add(rectangle);

    const tr = new Konva.Transformer({
      node: rectangle,
      rotateEnabled: false,
      keepRatio: false
    });
    this.layer.add(tr);

    this.rectangleList.push(rectangle);
    this.stage.add(this.layer);
  }

  // clearSelection() {
  //   Object.keys(this.selectedButton).forEach(key => {
  //     this.selectedButton[key] = false;
  //   });
  // }
  // setSelection(type: string) {
  //   this.selectedButton[type] = true;
  // }

  // addShape(type: string) {
  //   this.clearSelection();
  //   this.setSelection(type);
  //   if (type === 'rectangle') {
  //     this.addRectangle();
  //   }
  // }

  // undo() {
  //   const removedShape = this.shapes.pop();
  //   this.transformers.forEach(t => {
  //     t.detach();
  //   });
  //   if (removedShape) {
  //     removedShape.remove();
  //   }
  //   this.layer.draw();
  // }

  // addTransformerListeners() {
  //   const component = this;
  //   const tr = new Konva.Transformer({
  //     rotateEnabled: false,
  //     keepRatio: false
  //   });
  //   this.stage.on('click', function(e) {
  //     if (!this.clickStartShape) {
  //       return;
  //     }
  //     if (e.target._id === this.clickStartShape._id && this.clickStartShape.className ===  'Rect') {
  //       component.layer.add(tr);
  //       tr.attachTo(e.target);
  //       component.layer.draw();
  //     } else {
  //       tr.detach();
  //       component.layer.draw();
  //     }
  //   });
  // const component = this;
  // const tr = new Konva.Transformer();

  // this.stage.on('click', function(e) {
  //   // if click on empty area - remove all transformers
  //   if (e.target === component.stage) {
  //     component.stage.find('Transformer').destroy();
  //     component.layer.draw();
  //     return;
  //   }
  //   // do nothing if clicked NOT on our rectangles
  //   if (!e.target.hasName('rect')) {
  //     return;
  //   }

  //   component.layer.add(tr);
  //   tr.attachTo(e.target);
  //   component.layer.draw();
  // });
  // }

  // addDeleteListener(shape) {
  //   const component = this;
  //   window.addEventListener('keydown', function(e) {
  //     if (e.keyCode === 46) {
  //       shape.remove();
  //       component.transformers.forEach(t => {
  //         t.detach();
  //       });
  //       e.preventDefault();
  //     }
  //     component.layer.batchDraw();
  //   });
  // }
}

// class IgnoreArea {
//   x: number;
//   y: number;
//   width: number;
//   height: number;

//   constructor(rectangle: Konva.Rect) {
//     this.x = rectangle.x();
//     this.y = rectangle.y();
//     this.height = rectangle.height() * rectangle.scaleX();
//     this.width = rectangle.width() * rectangle.scaleY();
//   }
// }