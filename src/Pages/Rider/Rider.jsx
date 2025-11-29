import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';

const Rider = () => {
     const {
            register,
            handleSubmit,
            control,
            //formState: { errors } 
        } = useForm()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

     const serviceCenters = useLoaderData()
    const regionsDuplicate = serviceCenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]

    const dirtrictByRegion = region => {
        const regionDistrict = serviceCenters.filter(c => c.region === region)
        const districts = regionDistrict.map(d => d.district)
        return districts
    }

    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const handleBeARiderApplication = data =>{
        console.log(data)

    }
    return (
        <div>
            <h2 className="text-4xl text-primary">
                Be a Rider
            </h2>
            <form onSubmit={handleSubmit(handleBeARiderApplication)} className="mt-12 p-4 text-black">
               
               
                <div className="grid gird-cols-1 md:grid-cols-2 gap-8">


                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold">Rider Details</h4>
                        <label className="label">Sender Name</label>
                        <input type="text" {...register('senderName')} className="input w-full"
                            defaultValue={user?.displayName}
                            placeholder="Sender Name" />

                        <label className="label">Sender Email</label>
                        <input type="text" {...register('senderEmail')} className="input w-full"
                            defaultValue={user?.email}
                            placeholder="Sender Email" />

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Regions</legend>
                            <select defaultValue="Pick a region" {...register('senderRegion')} className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Districts</legend>
                            <select defaultValue="Pick a region" {...register('senderDistrict')} className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    dirtrictByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }


                            </select>

                        </fieldset>




                        <label className="label mt-4">Sender Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />


                    </fieldset>
                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold">Receiver Details</h4>
                        <label className="label">Receiver Name</label>
                        <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />

                        <label className="label">Receiver Email</label>
                        <input type="text" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receriver Regions</legend>
                            <select defaultValue="Pick a region" {...register('receiverRegion')} className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>
                       


                        <label className="label mt-4">Receiver Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />


                    </fieldset>


                </div>
                <input type="submit" className="btn btn-primary text-black mt-4" value="send Parcel"></input>
            </form>
        </div>
    );
};

export default Rider;