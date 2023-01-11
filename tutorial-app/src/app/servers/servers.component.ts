import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers', //--element
  //selector: '[app-servers]', --attribute
  //selector: '.app-servers', --class
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewSever = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Test Server';
  serverCreated = false;
  servers = ['TestServer', 'TestServer 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewSever = true;
    }, 2000);
  }

  ngOnInit() {
    
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Sever was created! Name:'+ this.serverName;
  }

  onUpdateServerName(event: any) {
     this.serverName = event.target.value;
  }
}

