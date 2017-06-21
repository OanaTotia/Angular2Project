import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import {Game} from './game'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";

@Injectable()
export class GameService {
    constructor( private http: Http, private router: Router){}

addGame( name: string, description: string, urlImage: string){
        let body = 'name='+name+"&description="+description+"&urlImage="+urlImage+'';
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post('http://ec2-52-56-203-137.eu-west-2.compute.amazonaws.com:3000/games', body, {headers: headers})
        .subscribe(data => {console.log("it worked!");
            // this.router.navigate(['/all-games']);
});
    
}
getGames() {
      return this.http.get(`http://ec2-52-56-203-137.eu-west-2.compute.amazonaws.com:3000/games`).map((res:Response) => res.json())
}
  
deleteGame(id: string){
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.delete('http://ec2-52-56-203-137.eu-west-2.compute.amazonaws.com:3000/games/'+id, {headers: headers})
    .subscribe(success => { 
          if(success.status == 200){
          console.log("it worked");
          }
      });

    
}
getGame(id: string) {
      return this.http.get(`http://ec2-52-56-203-137.eu-west-2.compute.amazonaws.com:3000/games/`+id).map((res:Response) => res.json())
}

update(id: string, name: string, description: string, urlImage: string ){

      let body = 'name='+name+"&description="+description+"&urlImage="+urlImage+'';
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.put('http://ec2-52-56-203-137.eu-west-2.compute.amazonaws.com:3000/games/'+id, body, {headers: headers})
      .subscribe(data => {console.log("it worked!"+name)
           
      });
}

  

     private handleError (error: Response | any) {
        
     let errMsg: string;
     if (error instanceof Response) {
       const body = error.json() || '';
       const err = body.error || JSON.stringify(body);
       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
     } else {
       errMsg = error.message ? error.message : error.toString();
     }
     console.error(errMsg);
     return Observable.throw(errMsg);
   }

}
