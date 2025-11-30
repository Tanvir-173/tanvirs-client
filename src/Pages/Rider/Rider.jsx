import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

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

    const riderRegion = useWatch({ control, name: 'region' })
    const handleRiderApplication = data => {
        console.log(data)
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your application has been submitted. we will reach out to you in 14 days",
                        showConfirmButton: false,
                        timer: 2000
                    });


                }
            })

    }
    return (
        <div>
            <h2 className="text-4xl text-primary">
                Be a Rider
            </h2>
            <form onSubmit={handleSubmit(handleRiderApplication)} className="mt-12 p-4 text-black">


                <div className="grid gird-cols-1 md:grid-cols-2 gap-8">


                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold">Rider Details</h4>
                        <label className="label">Rider Name</label>
                        <input type="text" {...register('name')} className="input w-full"
                            defaultValue={user?.displayName}
                            placeholder="Sender Name" />

                        <label className="label">Rider Email</label>
                        <input type="text" {...register('email')} className="input w-full"
                            defaultValue={user?.email}
                            placeholder="Sender Email" />

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Regions</legend>
                            <select defaultValue="Pick a region" {...register('region')} className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Districts</legend>
                            <select defaultValue="Pick a region" {...register('district')} className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    dirtrictByRegion(riderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }


                            </select>

                        </fieldset>




                        <label className="label mt-4">Your Address</label>
                        <input type="text" {...register('address')} className="input w-full" placeholder="Sender Address" />


                    </fieldset>
                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold">More Details</h4>
                        <label className="label">Dirving License</label>
                        <input type="text" {...register('license')} className="input w-full" placeholder="Dirving License" />

                        <label className="label">NID</label>
                        <input type="text" {...register('nid')} className="input w-full" placeholder="NID" />





                        <label className="label mt-4">BIKE</label>
                        <input type="text" {...register('bike')} className="input w-full" placeholder="BIKE" />


                    </fieldset>


                </div>
                <input type="submit" className="btn btn-primary text-black mt-4" value="Apply as a Rider"></input>
            </form>
        </div>
    );
};

export default Rider;