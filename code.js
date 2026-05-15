class System
{
    constructor()
    {
        this.State_N = 0;
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

        App.style.setProperty( "--RowsN", N + 3 );
        
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
        Element.id = "Evaluate";
        Element.className = "EvaluateStyle";
        Element.textContent = "Calcola";
        Element.onclick = () => PageSystem.EventEvaluate(); // se metto direttamente la funzione perde this
        App.append( Element );

        Element = document.createElement( "button" );
        Element.id = "Reset";
        Element.className = "ResetStyle";
        Element.textContent = "Reset";
        Element.onclick = () => PageSystem.EventReset(); // se metto direttamente la funzione perde this
        App.append( Element );
        // aggiorna lo stato interno
        this.State_N = N;
    }

    EventEvaluate()
    {
        let OriginalRef;
        let ScaledRef;
        let Cur;
        let Found = false;

        for( Cur = 0; Cur < this.State_N; Cur ++ )
        {
            ScaledRef = parseFloat( document.getElementById( "Scale" + Cur ).value );
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

        OriginalRef = parseFloat( document.getElementById( "Orig" + Cur ).value );
        if( isNaN( OriginalRef ) )
        {
            alert( "Inserisci un valore valido nella ricetta originale in corrispondenza del vincolo scalato" );
            return;
        }

        document.getElementById( "Name" + Cur ).style.backgroundColor = "palegreen";
        document.getElementById( "Name" + Cur ).style.color = "firebrick";

        document.getElementById( "Orig" + Cur ).style.backgroundColor = "palegreen";
        document.getElementById( "Orig" + Cur ).style.color = "firebrick";

        document.getElementById( "Scale" + Cur ).style.backgroundColor = "palegreen";
        document.getElementById( "Scale" + Cur ).style.color = "firebrick";

        let OriginalTmp;
        for( Cur = 0; Cur < this.State_N; Cur ++ )
        {
            OriginalTmp = parseFloat( document.getElementById( "Orig" + Cur ).value );
            if( !isNaN( OriginalTmp ) )
            {
                document.getElementById( "Scale" + Cur ).value = ( OriginalTmp * ScaledRef / OriginalRef ).toFixed( 1 ); 
            }
        }
    }

    EventReset()
    {
        let BackupN = this.State_N;

        this.EventClean();
        this.EventInit( BackupN );
    }
}

let PageSystem = new System();
PageSystem.EventInit( 15 );