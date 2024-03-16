import React from 'react';
import { SphereGeometry, MeshBasicMaterial, Mesh } from 'three';
import { ReactPlannerSharedStyle } from 'react-planner';

export default {
  name: 'circle',
  prototype: 'items',

  info: {
    title: 'Circle,100',
    tag: ['demo'],
    description: 'Demo item',
    image: require('./circle.png'),
    price: 25
  },

  properties: {
    color: {
      label: 'Color',
      type: 'color',
      defaultValue: ReactPlannerSharedStyle.AREA_MESH_COLOR.unselected
    },
    radius: {
      label: 'Radius',
      type: 'length-measure',
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    },
    segments: {
      label: 'Segments',
      type: 'number',
      defaultValue: 32
    }
  },

  render2D: (element, layer, scene) => {
    const style = {
      stroke: !element.selected ? ReactPlannerSharedStyle.LINE_MESH_COLOR.unselected : ReactPlannerSharedStyle.MESH_SELECTED,
      strokeWidth: 2,
      fill: element.properties.get('color')
    };

    const radius = element.properties.getIn(['radius', 'length']);

    return (
      <g>
        <circle cx={radius} cy={radius} r={radius} style={style} />
      </g>
    );
  },

  render3D: (element, layer, scene) => {
    const radius = element.properties.getIn(['radius', 'length']);
    const segments = element.properties.get('segments');

    const geometry = new SphereGeometry(radius, segments, segments);
    const material = new MeshBasicMaterial({
      color: element.properties.get('color')
    });

    const mesh = new Mesh(geometry, material);
    mesh.position.y = radius; // Adjust the Y position to move the circle onto the plane

    return Promise.resolve(mesh);
  }
};
