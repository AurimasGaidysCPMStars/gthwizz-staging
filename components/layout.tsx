
import { OrderDataContext } from '../services/data-context/OrderDataContext'
import { ImageSidebar } from './image-sidebar/ImageSidebar'
import { Sidebar } from './sidebar/Sidebar'
import { TopMenu } from './top-menu/TopMenu'

interface Props {
    children: any;
}

export const Layout = (props: Props) => {
    return (
        <div className={""}>
            <OrderDataContext />
            <main className={"flex flex-1 min-h-screen justify-between flex-col md:flex-row items-center"}>
                <Sidebar />
                <div className='flex flex-col w-full md:w-1/2 h-screen justify-center items-center'>
                    <TopMenu />
                    {props.children}
                </div>
                <ImageSidebar />
            </main>
        </div>
    )
}


// .main {
//     min-height: 100vh;
//     flex: 1;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     flex-direction: column;
//   }
  
//   @media (min-width: 768px) {
//     .main {
//       flex-direction: row;
//     }
//   }

// children: any;
// }

// export const Layout = (props: Props) => {
//     return (
//         <div className={styles.container}>

//             <OrderDataContext />
//             <main className={styles.main}>
//                 <div className='flex flex-col md:flex-row h-screen'>
//                     <Sidebar />
//                     <div className='flex flex-col w-1/2 h-screen'>
//                         <TopMenu />
//                         {props.children}
//                     </div>
//                     <ImageSidebar />
//                 </div>
//             </main>
//         </div>

//     )
// }