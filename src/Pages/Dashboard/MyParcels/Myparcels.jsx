import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Myparcels = () => {
    const {user}= useAuth()
    const axiosSecure = useAxiosSecure()
    const {data : parcels=[] }= useQuery({

        queryKey:['myParcels',user?.email],
        enabled: !!user?.email, 
        queryFn:async()=>{
                    const res = await axiosSecure.get(`/parcels?email=${user.email}`)
                    console.log(res.data)
                    return res.data
        }
    })
    return (
        <div>
            <h2>All of my parcels : {parcels.length}</h2>
        </div>
    );
};

export default Myparcels;