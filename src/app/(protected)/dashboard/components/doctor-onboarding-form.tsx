"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";
import { db } from "@/db";
import { createDoctor } from "@/app/actions/create-doctor";
import { revalidatePath, revalidateTag } from "next/cache";

// Define the form schema using Zod
const formSchema = z.object({
  doctorId: z
    .string()
    .min(1, "Doctor ID is required")
    .max(50, "Doctor ID must be 50 characters or less"),
  doctorName: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less"),
  doctorSpeciality: z.string().min(1, "Speciality is required"),
});

// Specialities list (you can expand this as needed)
const specialities = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Neurology",
  "Oncology",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
];

export default function DoctorOnboardingForm({ userId }: { userId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCustomSpeciality, setIsCustomSpeciality] = useState(false);

  // Initialize the form with react-hook-form and Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctorId: "",
      doctorName: "",
      doctorSpeciality: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const result = await createDoctor(
        userId,
        values.doctorId,
        values.doctorName,
        values.doctorSpeciality,
        {
          dayOfWeek: 0,
          startTime: "09:00",
          endTime: "17:00",
        }
      );

      if (result && result.error) {
        toast.error(result.error);
      } else if (result && result.success) {
        toast.success("Doctor onboarded successfully", {
          description: `Welcome, Dr. ${values.doctorName}!`,
        });
        form.reset();
        revalidatePath("/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      // revalidatePath("/dashboard")
    }
  }

  return (
    <div className=" flex md:flex-row flex-col justify-center items-center h-screen w-full mb-2">
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative">
        <Image
          src="/12.jpeg"
          alt="background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          {/* <Image src="/logo.png" alt="logo" width={100} height={100} /> */}
          <h2 className="text-2xl font-semibold text-white mt-4">
            Doctor Onboarding
          </h2>
        </div>
      </div>

      <div className="md:w-1/2 h-screen flex flex-col justify-center items-center ">
        <div className="max-w-lg mx-auto ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your unique doctor ID"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your unique identifier in the system (EHR&apos;s).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="doctorSpeciality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Speciality</FormLabel>
                    {!isCustomSpeciality ? (
                      <Select
                        onValueChange={(value) => {
                          if (value === "custom") {
                            setIsCustomSpeciality(true);
                            field.onChange("");
                          } else {
                            field.onChange(value);
                          }
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your speciality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specialities.map((speciality) => (
                            <SelectItem key={speciality} value={speciality}>
                              {speciality}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">
                            Enter custom speciality
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Input
                            placeholder="Enter your speciality"
                            {...field}
                            className="flex-grow"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsCustomSpeciality(false);
                            field.onChange("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
