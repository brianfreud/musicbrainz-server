/*
 * @flow
 * Copyright (C) 2018 MetaBrainz Foundation
 *
 * This file is part of MusicBrainz, the open internet music database,
 * and is licensed under the GPL version 2, or (at your option) any
 * later version: http://www.gnu.org/licenses/gpl-2.0.txt
 */

import * as React from 'react';

import PaginatedResults from '../../components/PaginatedResults';
import EntityLink from '../../static/scripts/common/components/EntityLink';
import type {ReportLabelUrlT} from '../types';

const LabelUrlList = ({
  items,
  pager,
}: {items: $ReadOnlyArray<ReportLabelUrlT>, pager: PagerT}) => {
  let lastGID = 0;
  let currentGID = 0;

  return (
    <PaginatedResults pager={pager}>
      <table className="tbl">
        <thead>
          <tr>
            <th>{l('URL')}</th>
            <th>{l('Label')}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            lastGID = currentGID;
            currentGID = item.url.gid;

            return (
              <>
                {lastGID === item.url.gid ? null : (
                  <tr className="even" key={item.url.gid}>
                    <td colSpan="2">
                      <EntityLink
                        content={item.url.href_url}
                        entity={item.url}
                      />
                    </td>
                  </tr>
                )}
                <tr key={item.label.gid}>
                  <td />
                  <td>
                    <EntityLink entity={item.label} />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </PaginatedResults>
  );
};

export default LabelUrlList;
