import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';


const SenedParcel = () => {
    const { register, handleSubmit, watch , formState: { errors } } = useForm()
    const serviceCenters = useLoaderData()
    const regionsDuplicate = serviceCenters.map(c=>c.region)
    const regions = [...new Set(regionsDuplicate)]  
    const senderRegion = watch('senderRegion')

    const dirtrictByRegion= region=>{
        const regionDistrict = serviceCenters.filter(c =>c.region===region)
        const districts = regionDistrict.map(d=>d.district)
        return districts
    }
    console.log(regions)
    const handleSendParcel = data => {

        console.log(data)

    }
    return (
        <div>
            <h2 className="text-5xl font-bold">send-parcel</h2>
            <form onSubmit={handleSubmit(handleSendParcel)} className="mt-12 p-4 text-black">
                <div>
                    <label

                        className="label mr-4">
                        <input type="radio" {...register('parcelType')}
                            value="document"
                            className="radio" defaultChecked />Document
                    </label>
                    <label

                        className="label">
                        <input type="radio" {...register('parcelType')}
                            value="non-document"
                            className="radio" />Non-Document
                    </label>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="number" {...register('parcelweight')} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>

                </div>
                <div className="grid gird-cols-1 md:grid-cols-2 gap-8">


                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold">Sender Details</h4>
                        <label className="label">Sender Name</label>
                        <input type="text" {...register('senderName')} className="input w-full" placeholder="Sender Name" />

                        <label className="label">Sender Email</label>
                        <input type="text" {...register('senderEmail')} className="input w-full" placeholder="Sender Email" />

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Regions</legend>
                            <select defaultValue="Pick a region" {...register('senderRegion')} className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r,i) =><option key={i} value={r}>{r}</option>)
                                }
                                
                                
                            </select>
                          
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Districts</legend>
                            <select defaultValue="Pick a region" {...register('senderDistrict')} className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    dirtrictByRegion(senderRegion).map((r,i) =><option key={i} value={r}>{r}</option>)
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


                        <label className="label mt-4">Receiver Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />

                        <label className="label mt-4">Receiver District</label>
                        <input type="text" {...register('receiverDistrict')} className="input w-full" placeholder="Receiver District" />
                    </fieldset>


                </div>
                <input type="submit" className="btn btn-primary text-black" value="send Parcel"></input>
            </form>

        </div>
    );
};

export default SenedParcel;