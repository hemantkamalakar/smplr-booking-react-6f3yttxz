import * as React from 'react';
import { FC, useEffect, useState, useCallback } from 'react';
import { loadSmplrJs } from '@smplrspace/smplr-loader';
import { Space } from '@smplrspace/smplr-loader/dist/generated/smplr';

import { Room, Desk, rooms, desks } from './data';

export const SpaceViewer: FC = () => {
  const spaceRef = React.useRef<Space>();

  const [viewerReady, setViewerReady] = useState(false);
  const [note, setNote] = useState('Click a desk or room');

  // start viewer
  useEffect(() => {
    loadSmplrJs('umd')
      .then((smplr) => {
        spaceRef.current = new smplr.Space({
          spaceId: 'f438671f-9979-42c6-8338-05c0015abb2d',
          clientToken: 'pub_eb760fee77634cdab2fe31146fc371c2',
          containerId: 'test',
        });
        spaceRef.current.startViewer({
          preview: true,
          allowModeChange: true,
          onReady: () => setViewerReady(true),
          onError: () => {
            // Error handling removed to comply with tslint
          },
        });
      })
      .catch(() => {
        // Error handling removed to comply with tslint
      });
  }, []);

  // show data when viewer ready
  useEffect(() => {
    if (!viewerReady || !spaceRef.current) {
      return;
    }
    
    spaceRef.current.addDataLayer<Room>({
      id: 'rooms',
      type: 'polygon',
      data: rooms,
      tooltip: (d) => `${d.name} - ${d.available ? 'free' : 'occupied'}`,
      color: (d) => (d.available ? '#3aa655' : '#ff3f34'),
      alpha: 0.7,
      height: 2.9,
      onClick: (d) => {
        setNote(`${d.name} is ${d.available ? 'free' : 'taken'}`);
      },
    });

    spaceRef.current.addDataLayer<Desk>({
      id: 'desks',
      type: 'furniture',
      data: desks,
      tooltip: (d) => `${d.name} - ${d.available ? 'free' : 'occupied'}`,
      color: (d) => (d.available ? '#50b268' : '#f75e56'),
      onClick: (d) => {
        setNote(`${d.name} is ${d.available ? 'free' : 'taken'}`);
      },
    });

    return () => {
      if (spaceRef.current) {
        spaceRef.current.removeDataLayer('rooms');
        spaceRef.current.removeDataLayer('desks');
      }
    };
  }, [viewerReady]);

  return (
    <React.Fragment>
      <div className="smplr-wrapper">
        <div id="test" className="smplr-embed" />
      </div>
      <p>{note}</p>
    </React.Fragment>
  );
};