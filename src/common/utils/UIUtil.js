import i18n from  'i18n/';
import React from 'react';

/**
 * Create table for API component.
 */
export const createTable = function(table, tableKey) {
   return (
      <div className="table-container">
         <table cellSpacing="0">
            <thead>
               <tr>
                  <th>{i18n.$t("attribute")}</th>
                  <th>{i18n.$t("description")}</th>
                  <th>{i18n.$t("type")}</th>
                  <th>{i18n.$t("default")}</th>
               </tr>
            </thead>
            <tbody>
               {
                  table.map((tr, key) => (
                     <tr key={`table${tableKey}-tr${key}`}>
                        {
                           tr.map((td, key) => (
                              <td key={`table${tableKey}-tr${key}-td${key}`}>
                                 {td}
                              </td>
                           ))
                        }
                     </tr>
                  ))
               }
            </tbody>
         </table>
      </div>
   )
}
