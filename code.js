class System
{
    constructor()
    {
    }

    CleanInterface()
    {
        // funzione che pulisce l'interfaccia grafica
        document.getElementById( "App" ).innerHTML = "";
    }

    InitInterface( N )
    {
        // dato il numero di elementi genera l'interfaccia grafica
        // funzione di output
        let App = document.getElementById( "App" );
        App.className = "AppStyle";

        App.style.gridTemplateRows = N + 2;
        
        let Cell; 
        let Element; 

        /* elemento originale con span 2 colonne poi nuovo*/

        for( let Cur = 0; Cur < N * 3; Cur ++ )
        {
            Cell = document.createElement( "div" );
            Cell.className = "CellStyle"
            Element = document.createElement( "input" );
            Cell.append( Element );
            App.append( Cell );
        }
        // aggiorna lo stato interno
        this.State_N = N;
    }
}

let PageSystem = new System();
PageSystem.InitInterface( 5 );