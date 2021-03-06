/*
 * @flow
 * Copyright (C) 2019 MetaBrainz Foundation
 *
 * This file is part of MusicBrainz, the open internet music database,
 * and is licensed under the GPL version 2, or (at your option) any
 * later version: http://www.gnu.org/licenses/gpl-2.0.txt
 */

import React from 'react';

import {withCatalystContext} from '../context';
import EventsList from '../components/EventsList';
import PaginatedResults from '../components/PaginatedResults';

import AreaLayout from './AreaLayout';

type Props = {|
  +$c: CatalystContextT,
  +area: AreaT,
  +events: $ReadOnlyArray<EventT>,
  +pager: PagerT,
|};

const AreaEvents = ({
  $c,
  area,
  events,
  pager,
}: Props) => (
  <AreaLayout entity={area} page="events" title={l('Events')}>
    <h2>{l('Events')}</h2>

    {events.length > 0 ? (
      <form action="/event/merge_queue" method="post">
        <PaginatedResults pager={pager}>
          <EventsList
            checkboxes="add-to-merge"
            events={events}
          />
        </PaginatedResults>
        {$c.user_exists ? (
          <div className="row">
            <span className="buttons">
              <button type="submit">
                {l('Add selected events for merging')}
              </button>
            </span>
          </div>
        ) : null}
      </form>
    ) : (
      <p>
        {l('This area is not currently associated with any events.')}
      </p>
    )}
  </AreaLayout>
);

export default withCatalystContext(AreaEvents);
