class System
{
    constructor()
    {
        this.State_N = 0;
        this.State_RefIndex = -1;
    }

    EventClean()
    {
        // funzione che pulisce l'interfaccia grafica
        document.getElementById( "App" ).innerHTML = "";
    }

    EventInit( N )
    {
        // dato il numero di elementi genera l'interfaccia grafica
        // funzione di output
        let App = document.getElementById( "App" );
        App.className = "AppStyle";

        App.style.setProperty( "--RowsN", N + 4 );
        
        let Cell; 
        let Element; 

        Element = document.createElement( "input" );
        Element.id = "Title";
        Element.className = "TitleStyle";
        Element.placeholder = "Titolo ricetta";
        App.append( Element );

        Element = document.createElement( "span" );
        Element.className = "HeaderStyle";
        Element.textContent = "Ingrediente";
        App.append( Element );

        Element = document.createElement( "span" );
        Element.className = "HeaderStyle";
        Element.textContent = "Originale";
        App.append( Element );

        Element = document.createElement( "span" );
        Element.className = "HeaderStyle";
        Element.textContent = "Scalata";
        App.append( Element );

        for( let Cur = 0; Cur < N; Cur ++ )
        {
            Element = document.createElement( "input" );
            Element.id = "Name" + Cur;
            Element.className = "CellStyle";
            App.append( Element );

            Element = document.createElement( "input" );
            Element.id = "Orig" + Cur;
            Element.className = "CellStyle";
            App.append( Element );

            Element = document.createElement( "input" );
            Element.id = "Scale" + Cur;
            Element.className = "CellStyle";
            App.append( Element );
        }

        Element = document.createElement( "button" );
        Element.id = "Reset";
        Element.className = "ButtonStyle";
        Element.textContent = "Reset";
        Element.onclick = () => PageSystem.EventReset(); // se metto direttamente la funzione perde this
        App.append( Element );

        Element = document.createElement( "button" );
        Element.id = "Reset";
        Element.className = "ButtonStyle";
        Element.textContent = "Modifica";
        Element.onclick = () => PageSystem.EventEdit(); // se metto direttamente la funzione perde this
        App.append( Element );

        Element = document.createElement( "button" );
        Element.id = "Evaluate";
        Element.className = "ButtonStyle";
        Element.textContent = "Calcola";
        Element.onclick = () => PageSystem.EventEvaluate(); // se metto direttamente la funzione perde this
        App.append( Element );

        // aggiorna lo stato interno
        this.State_N = N;
    }

    EventEvaluate()
    {
        let OriginalRef;
        let ScaledRef;
        let CurRef;
        let Found = false;

        for( CurRef = 0; CurRef < this.State_N; CurRef ++ )
        {
            ScaledRef = parseFloat( document.getElementById( "Scale" + CurRef ).value );
            if( !isNaN( ScaledRef ) )
            { 
                Found = true;
                break; 
            }
        }
        if( !Found )
        {
            alert( 'Inserisci la quantità da vincolare nella ricetta scalata' );
            return;
        }

        OriginalRef = parseFloat( document.getElementById( "Orig" + CurRef ).value );
        if( isNaN( OriginalRef ) )
        {
            alert( "Inserisci un valore valido nella ricetta originale in corrispondenza del vincolo scalato" );
            return;
        }

        document.getElementById( "Name" + CurRef ).style.backgroundColor = "palegreen";
        document.getElementById( "Name" + CurRef ).style.color = "firebrick";

        document.getElementById( "Orig" + CurRef ).style.backgroundColor = "palegreen";
        document.getElementById( "Orig" + CurRef ).style.color = "firebrick";

        document.getElementById( "Scale" + CurRef ).style.backgroundColor = "palegreen";
        document.getElementById( "Scale" + CurRef ).style.color = "firebrick";

        let OriginalTmp;
        let CurEvaluate;

        for( CurEvaluate = 0; CurEvaluate < this.State_N; CurEvaluate ++ )
        {
            OriginalTmp = parseFloat( document.getElementById( "Orig" + CurEvaluate ).value );
            if( !isNaN( OriginalTmp ) )
            {
                document.getElementById( "Scale" + CurEvaluate ).value = ( OriginalTmp * ScaledRef / OriginalRef ).toFixed( 1 ); 
            }
        }

        this.State_RefIndex = CurRef;
    }

    EventReset()
    {
        let BackupN = this.State_N;

        this.EventClean();
        this.EventInit( BackupN );
    }

    EventEdit()
    {
        for( let Cur = 0; Cur < this.State_N; Cur ++ )
        {
            document.getElementById( "Scale" + Cur ).value = '';
            if( Cur === this.State_RefIndex )
            {
                document.getElementById( "Name" + Cur ).style.backgroundColor = "white";
                document.getElementById( "Name" + Cur ).style.color = "black"; 

                document.getElementById( "Orig" + Cur ).style.backgroundColor = "white";
                document.getElementById( "Orig" + Cur ).style.color = "black"; 

                document.getElementById( "Scale" + Cur ).style.backgroundColor = "white";
                document.getElementById( "Scale" + Cur ).style.color = "black"; 
            }
        }

        this.State_RefIndex = -1;
    }
}

let PageSystem = new System();
PageSystem.EventInit( 15 );