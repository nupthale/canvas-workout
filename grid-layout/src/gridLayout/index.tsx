import React, { useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from 'lodash-es';

const ReactGridLayout = WidthProvider(RGL);

export default function GridLayout() {
  const defaultProps = {
    className: "layout",
    items: 20,
    rowHeight: 30,
    cols: 12
  };

  const generateDOM = () => {
    return _.map(_.range(defaultProps.items), function(i) {
        return (
          <div key={i}>
            <span className="text">{i}</span>
          </div>
        );
      });
  }

  const generateLayout = () =>  {
    return _.map(new Array(defaultProps.items), function(_items: any, i: number) {
      const y =  Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  }

  const [layout, setLayout] = useState(generateLayout());

  const onLayoutChange = (l: any) => {
    setLayout(l);
  };

  return (
    <ReactGridLayout
      layout={layout}
      onLayoutChange={onLayoutChange}
      {...defaultProps}
    >
      {generateDOM()}
    </ReactGridLayout>
  );
}
