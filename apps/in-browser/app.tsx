import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";

const ALLOWED_OPERATORS = ['=', '!=', '>', '<', '>=', '<=', 'is_one_of', 'is_not_one_of'];

function App() {
  return (
    <Vizzly.Dashboard
        dataSets={async () => {
          return [
            {
              id: "data_set_1",
              name: "My first data set",
              fields: [
                {
                  dataType: "number" as const,
                  publicName: "Player age",
                  id: "fie_1",
                  canBeDimension: false,
                  canBeMeasure: true,
                  allowedOperators: ALLOWED_OPERATORS
                },
                {
                  dataType: "string" as const,
                  publicName: "Game",
                  id: "fie_2",
                  canBeDimension: true,
                  canBeMeasure: false,
                  allowedOperators: ALLOWED_OPERATORS
                },
                {
                  dataType: "number" as const,
                  publicName: "Score",
                  id: "fie_3",
                  canBeDimension: false,
                  canBeMeasure: true,
                  allowedOperators: ALLOWED_OPERATORS
                },
                {
                  dataType: "date_time" as const,
                  publicName: "Recorded at",
                  id: "fie_4",
                  canBeDimension: false,
                  canBeMeasure: true,
                  allowedGranularities: ["month", "year"],
                  allowedOperators: ALLOWED_OPERATORS
                },
              ],
            },
          ];
        }}
        data={async (dataSet) => {
          if (dataSet.id == "data_set_1") {
            return [
              {
                fie_1: 16,
                fie_2: "Space invaders",
                fie_3: 54,
                fie_4: "2023-01-30T08:21:25.459Z",
              },
              {
                fie_1: 12,
                fie_2: "Space invaders",
                fie_3: 54,
                fie_4: "2023-02-13T08:21:25.459Z",
              },
              {
                fie_1: 9,
                fie_2: "Space invaders",
                fie_3: 4,
                fie_4: "2023-03-13T08:21:25.459Z",
              },
              {
                fie_1: 19,
                fie_2: "Space invaders",
                fie_3: 140,
                fie_4: "2023-04-07T08:21:25.459Z",
              },
              {
                fie_1: 90,
                fie_2: "Tetris",
                fie_3: 7,
                fie_4: "2023-03-13T08:21:25.459Z",
              },
              {
                fie_1: 73,
                fie_2: "Tetris",
                fie_3: 68,
                fie_4: "2023-04-07T08:21:25.459Z",
              },
            ];
          } else {
            throw "Unknown data set.";
          }
        }}
        identity={async () => {
          // Example loading tokens from the # value.
          // eyJkYXNoYm9hcmRBY2Nlc3NUb2tlbiI6ImV5SmhiR2NpT2lKRlV6STFOaUlzSW10cFpDSTZJa2hmVW1SUFNWRk5VVFpoWm1scVZtd3lNVVJGWjNONFRYSlhjV2xhZG5ZMmNWVXhXVU0zTW5kWlJtTWlmUS5leUpoWTJObGMzTlVlWEJsSWpvaWMzUmhibVJoY21RaUxDSndjbTlxWldOMFNXUWlPaUp3Y21wZk0yVXpOelkyTldRM1lUVmlOREJoT1dJNVpUaGhPR0ZrTnpFeU9HVTNNemdpTENKMWMyVnlVbVZtWlhKbGJtTmxJam9pT1RFeE4yRXdZelV0WkRabFpDMDBZelEwTFRnNE1qTXRPR0ZsTWpKbE9EZzBZbUV3SWl3aWMyTnZjR1VpT2lKeVpXRmtYM2R5YVhSbElpd2ljR0Z5Wlc1MFJHRnphR0p2WVhKa1NXUnpJanBiSW1SemFGODVZMkpsT0dGaVlXRXhNV0kwWmpnek9XTmhNVEF4T0dKa05HRmhZbUl3TVNKZExDSmxlSEJwY21Weklqb2lNakF5TXkweE1pMHdObFF3TXpveU1Ub3pNeTQwTWpaYUluMC5JelBwZFY3QVdEYU84SzZQU2dFQ1JUeU51Vm9xWGw3ejlxMVlrVlJXYUZmSVRJOVdyVFZlVE5Xa1lCX2FUdWFwck1qXzFaUzJhTGRfVlFmTkZ1VzZHUSIsImRhdGFBY2Nlc3NUb2tlbiI6ImV5SmhiR2NpT2lKRlV6STFOaUlzSW10cFpDSTZJa2hmVW1SUFNWRk5VVFpoWm1scVZtd3lNVVJGWjNONFRYSlhjV2xhZG5ZMmNWVXhXVU0zTW5kWlJtTWlmUS5leUp3Y205cVpXTjBTV1FpT2lKd2NtcGZNMlV6TnpZMk5XUTNZVFZpTkRCaE9XSTVaVGhoT0dGa056RXlPR1UzTXpnaUxDSmtZWFJoVTJWMFNXUnpJanBiSW1SaGRHRmZjMlYwWHpFaUxDSmtZWFJoWDNObGRGOHlJbDBzSW5ObFkzVnlaVVpwYkhSbGNuTWlPbnQ5TENKbGVIQnBjbVZ6SWpvaU1qQXlNeTB4TWkwd05sUXdNem95TVRvek15NDBNakJhSW4wLnJvNEFJdW1OWWF0WDVFZHJlT0J4T0VwQzdZb1BiT3VxRG5Za09RYm5tOWRQUmlNUFpPLVlxU2JiSm1CLU1wRUI3YnFUXzV2dnJfemd3QW1BaWstNjJnIiwicXVlcnlFbmdpbmVBY2Nlc3NUb2tlbiI6ImV5SmhiR2NpT2lKRlV6STFOaUlzSW10cFpDSTZJa2hmVW1SUFNWRk5VVFpoWm1scVZtd3lNVVJGWjNONFRYSlhjV2xhZG5ZMmNWVXhXVU0zTW5kWlJtTWlmUS5leUp3Y205cVpXTjBTV1FpT2lKd2NtcGZNMlV6TnpZMk5XUTNZVFZpTkRCaE9XSTVaVGhoT0dGa056RXlPR1UzTXpnaUxDSmhiR3h2ZDBSaGRHRmlZWE5sVTJOb1pXMWhRV05qWlhOeklqcG1ZV3h6WlN3aVlXeHNiM2RFWVhSaFVISmxkbWxsZDBGalkyVnpjeUk2Wm1Gc2MyVXNJbVY0Y0dseVpYTWlPaUl5TURJekxURXlMVEEyVkRBek9qSXhPak16TGpReU9Gb2lmUS45SHFrUlRKWGU2cXJXLUhHWC1EMmNxNW1NRzBESWZneWFPN2dEeHExb3RMaDZPSWRRNXRPODBBdlJRZEtBVGFaWm45QjNaV3VwWHlVZDgwbzEwX2pwdyJ9
          const encodedTokens = window.location.hash.replace('#', '');
          const identityTokens = JSON.parse(atob(encodedTokens));
          return identityTokens;
        }}
      />
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
