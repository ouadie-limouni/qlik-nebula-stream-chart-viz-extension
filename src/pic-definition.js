export default function ({
  layout, // eslint-disable-line no-unused-vars
  context, // eslint-disable-line no-unused-vars
}) {
  return {
    collections: [{
      key: 'stacked',
      data: {
        extract: {
          field: 'qDimensionInfo/0',
          props: {
            line: { field: 'qDimensionInfo/1' },
            end: { field: 'qMeasureInfo/0' },
          },
        },
        stack: {
          stackKey: (d) => d.value,
          value: (d) => d.end.value,
          offset: 'silhouette',
          order: 'insideout',
        },
      },
    }],
    scales: {
      y: {
        data: {
          collection: {
            key: 'stacked',
          },
        },
        invert: false,
        expand: 0.5,
      },
      t: {
        data: {
          extract: {
            field: 'qDimensionInfo/0',
          },
        },
        padding: 0.5,
      },
      l: {
        data: {
          extract: {
            field: 'qMeasureInfo/0',
          },
        },
      },
      color: {
        data: {
          extract: {
            field: 'qDimensionInfo/1',
          },
        },
        type: 'color',
      },
    },
    components: [
      {
        type: 'axis',
        dock: 'bottom',
        scale: 't',
      },
      {
        type: 'axis',
        dock: 'left',
        scale: 'l',
      },
      {
        key: 'lines',
        type: 'line',
        data: {
          collection: 'stacked',
        },
        settings: {
          coordinates: {
            major: { scale: 't' },
            minor0: { scale: 'y', ref: 'start' },
            minor: { scale: 'y', ref: 'end' },
            layerId: { ref: 'line' },
          },
          layers: {
            curve: 'monotone',
            line: {
              show: false,
            },
            area: {
              fill: { scale: 'color', ref: 'line' },
              opacity: 1,
            },
          },
        },
      },
      {
        type: 'legend-cat',
        scale: 'color',
        key: 'legend',
        dock: 'top',
        settings: {
          title: {
            show: false,
          },
          layout: {
            size: 2,
          },
        },
      },
    ],
  };
}
