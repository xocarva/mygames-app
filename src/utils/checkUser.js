    // const user = useUser();
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // useEffect(() => {

    //     const checkUser = () => {
    //         const tokenExp = new Date( jwtDecode( user?.token ).exp * 1000 );
    //         console.log('checking user')
    //         if( tokenExp ) {
    //           const minutesLeft = ( tokenExp - new Date() ) / 1000 / 60;
    //           console.log(`Session will close in ${Math.round(minutesLeft)} minutes`);
    //           if ( minutesLeft < 2 ){
    //             dispatch({ type: 'logout' });
    //             navigate('/');
    //             console.log('closed');
    //             clearInterval( refreshInterval );
    //           }
    //         }
    //     }

    //     let refreshInterval;

    //     if( user ) {
    //         refreshInterval = setInterval( () => checkUser(), 1000 * 60 );
    //         checkUser();
    //       }

    //     return () => clearInterval( refreshInterval );

    // });
