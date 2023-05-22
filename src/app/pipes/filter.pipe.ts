import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {

  transform(values: any, arg: any): any {
    if (arg === '' || arg.length < 1) return values;
    const resultPosts = [];
    for (const listGrupo of values) {
      if (listGrupo.name_user.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(listGrupo);
      };
      if (listGrupo.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(listGrupo);
      };
      if (listGrupo.group.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(listGrupo);
      };
    };
    return resultPosts;
  }

}
