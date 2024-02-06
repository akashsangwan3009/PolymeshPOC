import { Component } from '@angular/core';

interface FlowNode {
  id: number;
  x: number;
  y: number;
  children?: FlowNode[];
}

@Component({
  selector: 'app-flow-component',
  templateUrl: './flow-component.component.html',
  styleUrls: ['./flow-component.component.css']
})

export class FlowComponentComponent {
  nodes: FlowNode[] = [
    { id: 1, x: 100, y: 50, children: [
      { id: 2, x: 200, y: 150 },
      { id: 3, x: 300, y: 100 },
      // Add more child nodes as needed
    ]},
    // Add more parent nodes as needed
  ];
}
