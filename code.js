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

        App.style.setProperty( "--RowsN", N + 5 );
        
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
        Element.textContent = "Originale [g]";
        App.append( Element );

        Element = document.createElement( "span" );
        Element.className = "HeaderStyle";
        Element.textContent = "Scalata [g]";
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

        Element = document.createElement( "span" );
        Element.className = "HeaderStyle";
        Element.textContent = "Totale";
        App.append( Element );

        Element = document.createElement( "span" );
        Element.id = "TotOriginal";
        Element.className = "HeaderStyle";
        App.append( Element );

        Element = document.createElement( "span" );
        Element.id = "TotScaled";
        Element.className = "HeaderStyle";
        App.append( Element );

        Element = document.createElement( "button" );
        Element.id = "Reset";
        Element.className = "ButtonStyle";
        Element.textContent = "Reset";
        Element.onclick = () => this.EventReset(); // se metto direttamente la funzione perde this
        App.append( Element );

        Element = document.createElement( "button" );
        Element.id = "Reset";
        Element.className = "ButtonStyle";
        Element.textContent = "Modifica";
        Element.onclick = () => this.EventEdit(); // se metto direttamente la funzione perde this
        App.append( Element );

        Element = document.createElement( "button" );
        Element.id = "Evaluate";
        Element.className = "ButtonStyle";
        Element.textContent = "Calcola";
        Element.onclick = () => this.EventEvaluate(); // se metto direttamente la funzione perde this
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
        let TotOriginal = 0;
        let TotScaled = 0;

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

        let OriginalTmp;
        let ScaledTmp;
        let CurEvaluate;

        for( CurEvaluate = 0; CurEvaluate < this.State_N; CurEvaluate ++ )
        {
            OriginalTmp = parseFloat( document.getElementById( "Orig" + CurEvaluate ).value );
            if( !isNaN( OriginalTmp ) )
            {
                ScaledTmp = ( OriginalTmp * ScaledRef / OriginalRef );
                document.getElementById( "Scale" + CurEvaluate ).value = ScaledTmp.toFixed( 1 );
                TotOriginal += OriginalTmp;
                TotScaled += ScaledTmp;
            }

            if( CurEvaluate == CurRef )
            {
                document.getElementById( "Name" + CurEvaluate ).style.backgroundColor = "palegreen";
                document.getElementById( "Name" + CurEvaluate ).style.color = "firebrick";

                document.getElementById( "Orig" + CurEvaluate ).style.backgroundColor = "palegreen";
                document.getElementById( "Orig" + CurEvaluate ).style.color = "firebrick";

                document.getElementById( "Scale" + CurEvaluate ).style.backgroundColor = "palegreen";
                document.getElementById( "Scale" + CurEvaluate ).style.color = "firebrick";
            }
            else
            {
                document.getElementById( "Name" + CurEvaluate ).style.backgroundColor = "white";
                document.getElementById( "Name" + CurEvaluate ).style.color = "black";

                document.getElementById( "Orig" + CurEvaluate ).style.backgroundColor = "white";
                document.getElementById( "Orig" + CurEvaluate ).style.color = "black";

                document.getElementById( "Scale" + CurEvaluate ).style.backgroundColor = "white";
                document.getElementById( "Scale" + CurEvaluate ).style.color = "black";
            }
        }

        document.getElementById( "TotOriginal" ).textContent = TotOriginal.toFixed( 1 );
        document.getElementById( "TotScaled" ).textContent = TotScaled.toFixed( 1 );
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

            document.getElementById( "Name" + Cur ).style.backgroundColor = "white";
            document.getElementById( "Name" + Cur ).style.color = "black"; 

            document.getElementById( "Orig" + Cur ).style.backgroundColor = "white";
            document.getElementById( "Orig" + Cur ).style.color = "black"; 

            document.getElementById( "Scale" + Cur ).style.backgroundColor = "white";
            document.getElementById( "Scale" + Cur ).style.color = "black"; 
        }

        document.getElementById( "TotScaled" ).textContent = "";
    }
}

let PageSystem = new System();
PageSystem.EventInit( 10 );