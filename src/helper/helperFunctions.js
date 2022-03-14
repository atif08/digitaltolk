/**
 * Created by Atif on 10/1/2019.
 */
import moment from 'moment';


export function ucFirst  (s)  {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
