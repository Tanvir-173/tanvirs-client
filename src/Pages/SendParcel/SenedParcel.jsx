import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';


const SenedParcel = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm()
    const serviceCenters = useLoaderData()
    const regionsDuplicate = serviceCenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })

    const dirtrictByRegion = region => {
        const regionDistrict = serviceCenters.filter(c => c.region === region)
        const districts = regionDistrict.map(d => d.district)
        return districts
    }

    const handleSendParcel = data => {
        console.log(data)

        const isDocument = data.parcelType === 'document'
        const isSameDistrict = data.senderDistrict === data.receiverDistrict
        const parcelWeight = parseFloat(data.parcelweight)
        console.log(parcelWeight)

        let cost = 0
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80
        }
        else {
            if (parcelWeight < 3) {

                cost = isSameDistrict ? 110 : 150

            }
            else {
                const minCharge = isSameDistrict ? 110 : 150
                const extraWeight = parcelWeight - 3
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40
                cost = minCharge + extraCharge
            }
        }

        console.log('cost', cost)
        Swal.fire({
            title: "Agree wtih the cost?",
            text: `You will be charged ${cost} taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I agree!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
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
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receriver District</legend>
                            <select defaultValue="Pick a region" {...register('receiverDistrict')} className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    dirtrictByRegion(receiverRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
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

export default SenedParcel;